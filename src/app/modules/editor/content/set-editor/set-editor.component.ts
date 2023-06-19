import { Component, Input } from '@angular/core';
import { Set } from "../../../../data/models/Set";

@Component({
  selector: 'app-set-editor',
  templateUrl: './set-editor.component.html',
  styleUrls: ['./set-editor.component.css']
})
export class SetEditorComponent {
  @Input() set?: Set;
}
