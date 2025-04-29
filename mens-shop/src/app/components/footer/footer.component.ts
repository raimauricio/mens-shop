import { Component } from '@angular/core'
import { PrimeModule } from '../../shared/prime-module/prime.module';
import { ROTAS } from '../../const/rotas.const';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [PrimeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  rotas = ROTAS;

}
