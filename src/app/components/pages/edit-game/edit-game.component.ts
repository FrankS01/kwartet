import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { KwartetGame } from "../../../data/models/kwartetgame-model";
import { KwartetGameService } from "../../../services/kwartet-game.service";
import { KwartetSet } from "../../../data/models/kwartetset-model";
import { FormControl, Validators } from "@angular/forms";
import { SET_TITLE_CHARACTER_LIMIT } from "../../../config/global-settings";
import { MessageService } from "primeng/api";

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
              private kwartetGameService: KwartetGameService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.getKwartetGameFromService();
  }

  /**
   * Using the kwartet game uuid from the router and the {@link KwartetGameService}, retrieves a kwartet game
   */
  getKwartetGameFromService(): void {
    const uuid = String(this.route.snapshot.paramMap.get('uuid'));
    this.kwartetGame = this.kwartetGameService.getKwartetGameByUuid(uuid);
  }

  private createNewSet(): void {
    // Create set object
    let newSet: KwartetSet = {
      setName: this.nameFormControl.value,
      card1Name: "",
      card2Name: "",
      card3Name: "",
      card4Name: ""
    }

    // Add set object to kwartet game that is currently being edited
    this.kwartetGame?.sets.push(newSet);

    // Update game using service
    this.kwartetGameService.updateKwartetGame(<KwartetGame> this.kwartetGame);

    // Show confirmation toast to user
    this.messageService.add({ severity: 'success', summary: 'Success', detail: `Set "${ this.nameFormControl.value }" was succesfully created.` });

    // Reset form value
    this.nameFormControl.reset();
  }

  showCreateSetDialog() {
    this.createSetDialogIsVisible = true;
  }

  onClickCreateSetButton() {
    this.createSetDialogIsVisible = false;
    this.createNewSet();
  }
}
