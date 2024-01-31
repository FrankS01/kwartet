import { Component, Input } from '@angular/core';
import { KwartetSet } from "../../../data/models/KwartetSet";

@Component({
  selector: 'app-edit-set',
  templateUrl: './edit-set.component.html',
  styleUrl: './edit-set.component.scss'
})
export class EditSetComponent {
  @Input() kwartetSet?: KwartetSet;
}
