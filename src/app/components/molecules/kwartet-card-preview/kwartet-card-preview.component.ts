import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KwartetSet } from "../../../data/models/kwartetset-model";

@Component({
  selector: 'app-kwartet-card-preview',
  templateUrl: './kwartet-card-preview.component.html',
  styleUrl: './kwartet-card-preview.component.scss'
})
export class KwartetCardPreviewComponent {

  // The kwartet card number (1, 2, 3 or 4)that is currently being previewed by this component
  @Input() currentKwartetCard?: number;

  // The full kwartet set that this card is a part of (this is needed because it is shown on the card as well)
  @Input() kwartetSet?: KwartetSet;

  // Emitted when the user clicks on the card preview
  @Output() onCardClick = new EventEmitter<any>();

  // Whether the "edit" overlay should be shown
  showEditOverlay: boolean = false;

  onCardClicked() {
    this.onCardClick.emit(this.currentKwartetCard!);
  }

}
