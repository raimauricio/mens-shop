import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { EntryPointComponent } from '../../components/entry-point/entry-point.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [EntryPointComponent, InputTextModule, CheckboxModule, PasswordModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
