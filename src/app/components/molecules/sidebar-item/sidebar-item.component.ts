import { Component, Input } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { RouterLink } from "@angular/router";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-sidebar-item',
  standalone: true,
  imports: [
    ButtonModule,
    RippleModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss'
})
export class SidebarItemComponent {
  @Input() icon?: string = ""
  @Input() text?: string = ""
}
