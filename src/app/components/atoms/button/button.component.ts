import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  // The text that is shown on the button
  @Input() label: string = "";

  // The route this button takes you to when clicked (optional)
  @Input() route: string | null = null;

  // Whether to use float animation on hover
  @Input() animateOnHover: boolean = false;

  @Output() onClick = new EventEmitter<void>();

  onClickButton() {
    this.onClick.emit();
  }
}
