import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { KwartetGame } from "../../../data/models/kwartetgame-model";
import { KwartetGameService } from "../../../services/kwartet-game.service";
import { KwartetSet } from "../../../data/models/kwartetset-model";
import { FormControl, Validators } from "@angular/forms";
import { SET_TITLE_CHARACTER_LIMIT } from "../../../config/global-settings";
import { MessageService } from "primeng/api";
import * as uuid from "uuid";

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrl: './edit-game.component.scss'
})
export class EditGameComponent implements OnInit {

  /** The game that is being edited */
  @Input() kwartetGame?: KwartetGame

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
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.getKwartetGameFromService();
  }

  /**
   * Using the kwartet game uuid from the router and the {@link KwartetGameService}, retrieves a kwartet game
   */
  getKwartetGameFromService(): void {
    const uuid = String(this.route.snapshot.paramMap.get('game-uuid'));
    this.kwartetGame = this.kwartetGameService.getKwartetGameByUuid(uuid);
  }

  private createNewSet(): void {
    // Create set object
    let newSet: KwartetSet = {
      uuid: uuid.v4(),
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

    // Add set object to kwartet game that is currently being edited
    this.kwartetGame?.sets.push(newSet);

    // Update game using service
    this.kwartetGameService.updateKwartetGame(this.kwartetGame as KwartetGame);

    // Show confirmation toast to user
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `Set "${this.nameFormControl.value}" was succesfully created.`
    });

    // Reset form value
    this.nameFormControl.reset();

    // Navigate to newly created set
    void this.router.navigateByUrl(`/edit-game/${this.kwartetGame?.uuid}/edit-set/${newSet.uuid}`)
  }

  showCreateSetDialog() {
    this.createSetDialogIsVisible = true;
  }

  onClickCreateSetButton() {
    this.createSetDialogIsVisible = false;
    this.createNewSet();
  }
}
