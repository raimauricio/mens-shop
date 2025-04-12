import { Component } from '@angular/core';
import { BasePageComponent } from '../../components/base-page/base-page.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BasePageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
