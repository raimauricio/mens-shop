import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeModule } from '../../shared/prime-module/prime.module';

@Component({
  selector: 'app-entry-point',
  standalone: true,
  imports: [RouterModule, PrimeModule],
  templateUrl: './entry-point.component.html',
  styleUrl: './entry-point.component.scss'
})
export class EntryPointComponent {
  @Input() titulo: string;
}
