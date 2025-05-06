import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastreComponent } from './pages/cadastre/cadastre.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ROTAS } from './const/rotas.const';
import { MyShoppingComponent } from './pages/my-shopping/my-shopping.component';

const removeBarra = (path: string) => path.replace(/^\//, '');

export const routes: Routes = [
  {
    path: removeBarra(ROTAS.HOME),
    component: HomeComponent
  },
  {
    path: removeBarra(ROTAS.LOGIN),
    component: LoginComponent,
  },
  {
    path: removeBarra(ROTAS.CADASTRESE),
    component: CadastreComponent,
  },
  {
    path: removeBarra(ROTAS.CARRINHO),
    component: CartComponent,
  },
  {
    path: removeBarra(ROTAS.CHECKOUT),
    component: CheckoutComponent,
  },
  {
    path: removeBarra(ROTAS.MINHAS_COMPRAS),
    component: MyShoppingComponent,
  },
  {
    pathMatch: 'full',
    path: '**',
    redirectTo: removeBarra(ROTAS.HOME)
  }
];
