import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { LoginComponent } from '../../pages/login/login.component';
import { CadastreComponent } from '../../pages/cadastre/cadastre.component';

@Component({
  selector: 'app-base-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, LoginComponent, CadastreComponent],
  templateUrl: './base-page.component.html',
  styleUrl: './base-page.component.scss'
})
export class BasePageComponent {

}
