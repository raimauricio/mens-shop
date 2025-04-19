import { EntryPointComponent } from './../../components/entry-point/entry-point.component';
import { Component } from '@angular/core';
import { PrimeModule } from '../../shared/prime-module/prime.module';

@Component({
  selector: 'app-cadastre',
  standalone: true,
  imports: [EntryPointComponent, PrimeModule],
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
