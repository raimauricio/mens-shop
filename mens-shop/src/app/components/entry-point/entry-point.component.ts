import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-entry-point',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './entry-point.component.html',
  styleUrl: './entry-point.component.scss'
})
export class EntryPointComponent {
  @Input() titulo: string;
}
