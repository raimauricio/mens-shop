import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { LoginComponent } from '../../pages/login/login.component';
import { CadastreComponent } from '../../pages/cadastre/cadastre.component';
import { PrimeModule } from '../../shared/prime-module/prime.module';

@Component({
  selector: 'app-base-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, LoginComponent, CadastreComponent, PrimeModule],
  templateUrl: './base-page.component.html',
  styleUrl: './base-page.component.scss'
})
export class BasePageComponent {

}
