import { Component } from '@angular/core';
import { PrimeModule } from '../../shared/prime-module/prime.module';
import { BasePageComponent } from '../../components/base-page/base-page.component';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
}


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [PrimeModule, BasePageComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  carrinhoDeCompras: CartItem[] = [
    {
      name: 'Camisa Polo Azul',
      price: 100,
      quantity: 1,
      image: 'assets/img/banner/img1.jpg',
    },
    {
      name: 'Camisa Social Branca',
      price: 150,
      quantity: 2,
      image: 'assets/img/banner/img2.jpg',
    },
  ];

  aumentarQuantidade(index: number): void {
    this.carrinhoDeCompras[index].quantity++;
  }

  diminuirQuantidade(index: number): void {
    if (this.carrinhoDeCompras[index].quantity > 1) {
      this.carrinhoDeCompras[index].quantity--;
    }
  }

  removeItem(index: number): void {
    this.carrinhoDeCompras.splice(index, 1);
  }

  getTotal(): number {
    return this.carrinhoDeCompras.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
