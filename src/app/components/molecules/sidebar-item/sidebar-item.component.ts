import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-item',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss'
})
export class SidebarItemComponent {
  @Input() icon?: string = ""
}
