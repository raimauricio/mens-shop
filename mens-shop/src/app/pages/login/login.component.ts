import { Component } from '@angular/core';
import { EntryPointComponent } from '../../components/entry-point/entry-point.component';
import { PrimeModule } from '../../shared/prime-module/prime.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [EntryPointComponent, PrimeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  enviarLink = false;
  esqueciSenha = false;
}
