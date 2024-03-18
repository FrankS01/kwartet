import { Component, Input } from '@angular/core';
import { KwartetCard } from "../../../data/models/kwartetcard-model";

@Component({
  selector: 'app-edit-card-dialog',
  templateUrl: './edit-card-dialog.component.html',
  styleUrl: './edit-card-dialog.component.scss'
})
export class EditCardDialogComponent {

  // Whether the "edit card" dialog is visible or not
  @Input() editCardDialogIsVisible: boolean = false;

  @Input() currentEditedCard?: KwartetCard;


}
