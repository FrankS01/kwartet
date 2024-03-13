import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KwartetSet } from "../../../data/models/kwartetset-model";

@Component({
  selector: 'app-kwartet-card-preview',
  templateUrl: './kwartet-card-preview.component.html',
  styleUrl: './kwartet-card-preview.component.scss'
})
export class KwartetCardPreviewComponent {

  @Input() kwartetSet?: KwartetSet;
  @Output() onCardClick = new EventEmitter<KwartetSet>();

  onCardClicked() {
    this.onCardClick.emit(this.kwartetSet!);
  }

}
