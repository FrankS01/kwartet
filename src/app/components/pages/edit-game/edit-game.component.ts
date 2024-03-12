import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { KwartetGame } from "../../../data/models/kwartetgame-model";
import { KwartetGameService } from "../../../services/kwartet-game.service";
import { KwartetSet } from "../../../data/models/kwartetset-model";
import { FormControl, Validators } from "@angular/forms";
import { SET_TITLE_CHARACTER_LIMIT } from "../../../config/global-settings";
import { MessageService } from "primeng/api";
import { KwartetSetService } from "../../../services/kwartet-set.service";

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrl: './edit-game.component.scss'
})
export class EditGameComponent implements OnInit {

  /** The game that is being edited */
  kwartetGame?: KwartetGame

  kwartetSets?: KwartetSet[]

  // Whether the "create set" dialog is visible or not
  createSetDialogIsVisible: boolean = false;

  // Form value, used in "create set" dialog
  nameFormControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required,
      Validators.maxLength(SET_TITLE_CHARACTER_LIMIT)]
  });

  constructor(private route: ActivatedRoute,
              private router: Router,
              private kwartetGameService: KwartetGameService,
              private kwartetSetService: KwartetSetService,
              private messageService: MessageService) {
  }

  async ngOnInit() {
    await this.getKwartetGameFromService();
    await this.getKwartetSetsFromService();
  }

  /**
   * Using the kwartet game id from the router and the {@link KwartetGameService}, retrieves a kwartet game
   */
  async getKwartetGameFromService() {
    const id: number = Number(this.route.snapshot.paramMap.get('game-id'));
    this.kwartetGame = await this.kwartetGameService.getKwartetGameById(id);
  }

  /**
   * Using the kwartet game uuid from the router and the {@link KwartetGameService}, retrieves a kwartet game
   */
  async getKwartetSetsFromService() {
    const gameId: number = Number(this.route.snapshot.paramMap.get('game-id'));
    this.kwartetSets = await this.kwartetSetService.getKwartetSetsByGameId(gameId);
  }

  async createNewSet() {
    // Create set object
    let newSet: KwartetSet = {
      kwartetGameId: this.kwartetGame?.id!,
      setName: this.nameFormControl.value,
      card1: {
        name: "Unnamed card",
        base64CoverImage: ""
      },
      card2: {
        name: "Unnamed card",
        base64CoverImage: ""
      },
      card3: {
        name: "Unnamed card",
        base64CoverImage: ""
      },
      card4: {
        name: "Unnamed card",
        base64CoverImage: ""
      },
    }

    // Create new kwartet set
    await this.kwartetSetService.createKwartetSet(newSet);

    // Update kwartet sets
    await this.getKwartetSetsFromService();

    // Show confirmation toast to user
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `Set "${this.nameFormControl.value}" was succesfully created.`
    });

    // Reset form value
    this.nameFormControl.reset();

    // Navigate to newly created set
    void this.router.navigateByUrl(`/edit-game/${this.kwartetGame?.id}/edit-set/${newSet.id}`)
  }

  showCreateSetDialog() {
    this.createSetDialogIsVisible = true;
  }

  async onClickCreateSetButton() {
    this.createSetDialogIsVisible = false;
    await this.createNewSet();
  }
}
