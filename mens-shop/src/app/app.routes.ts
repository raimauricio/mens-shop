import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastreComponent } from './pages/cadastre/cadastre.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cadastre-se',
    component: CadastreComponent,
  },
  {
    path: 'carrinho',
    component: CartComponent,
  },
  {
    pathMatch: 'full',
    path: '**',
    redirectTo: '/'
  }
];
