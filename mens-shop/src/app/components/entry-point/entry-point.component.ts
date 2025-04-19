import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-entry-point',
  standalone: true,
  imports: [],
  templateUrl: './entry-point.component.html',
  styleUrl: './entry-point.component.scss'
})
export class EntryPointComponent {
  @Input() titulo: string;
}
