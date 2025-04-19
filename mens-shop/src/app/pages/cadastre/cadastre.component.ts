import { EntryPointComponent } from './../../components/entry-point/entry-point.component';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-cadastre',
  standalone: true,
  imports: [EntryPointComponent, InputTextModule, PasswordModule, DropdownModule, CheckboxModule, ButtonModule],
  templateUrl: './cadastre.component.html',
  styleUrl: './cadastre.component.scss'
})
export class CadastreComponent {
  paises = [
    { nome: 'Brasil', code: 'BR' },
    { nome: 'Portugal', code: 'PT' },
    { nome: 'Estados Unidos', code: 'US' },
    { nome: 'Canadá', code: 'CA' }
  ];

}
