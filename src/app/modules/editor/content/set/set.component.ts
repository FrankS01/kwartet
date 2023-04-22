import { Component, Input } from '@angular/core';
import { Set } from "../../../../data/models/Set";

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css']
})
export class SetComponent {
  @Input() set?: Set;
}
