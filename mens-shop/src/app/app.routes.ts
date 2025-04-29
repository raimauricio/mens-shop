import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastreComponent } from './pages/cadastre/cadastre.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ROTAS } from './const/rotas.const';

export const routes: Routes = [
  {
    path: ROTAS.HOME,
    component: HomeComponent
  },
  {
    path: ROTAS.LOGIN,
    component: LoginComponent,
  },
  {
    path: ROTAS.CADASTRESE,
    component: CadastreComponent,
  },
  {
    path: ROTAS.CARRINHO,
    component: CartComponent,
  },
  {
    path: ROTAS.CHECKOUT,
    component: CheckoutComponent,
  },
  {
    pathMatch: 'full',
    path: '**',
    redirectTo: ROTAS.HOME
  }
];
