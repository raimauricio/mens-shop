import { Component, OnInit, inject } from '@angular/core';
import { PrimeModule } from '../../shared/prime-module/prime.module';
import { JornadaServiceService } from '../../storage/jornada-service.service';
import { Router } from '@angular/router';

interface IProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  rating: number;
  stock: number;
}

@Component({
  selector: 'app-products-panel',
  standalone: true,
  imports: [PrimeModule],
  templateUrl: './products-panel.component.html',
  styleUrl: './products-panel.component.scss'
})


export class ProductsPanelComponent implements OnInit {
  jornadaStorage = inject(JornadaServiceService);
  routes = inject(Router);

  products: IProduct[] = [];
  responsiveOptions: any[] | undefined;


  ngOnInit() {
    this.products = [
      {
        id: 1,
        name: 'Product 1',
        description: 'Description of Product 1',
        image: '../../../assets/img/banner/img1.jpg',
        price: 100,
        category: 'Category 1',
        rating: 4.5,
        stock: 10
      },
      {
        id: 2,
        name: 'Product 2',
        description: 'Description of Product 2',
        image: '../../../assets/img/banner/img1.jpg',
        price: 150,
        category: 'Category 2',
        rating: 4.0,
        stock: 5
      },
      {
        id: 3,
        name: 'Product 3',
        description: 'Description of Product 3',
        image: '../../../assets/img/banner/img1.jpg',
        price: 200,
        category: 'Category 3',
        rating: 5.0,
        stock: 8
      },
      {
        id: 4,
        name: 'Product 4',
        description: 'Description of Product 4',
        image: '../../../assets/img/banner/img1.jpg',
        price: 250,
        category: 'Category 4',
        rating: 3.5,
        stock: 12
      },
      {
        id: 1,
        name: 'Product 1',
        description: 'Description of Product 1',
        image: '../../../assets/img/banner/img1.jpg',
        price: 100,
        category: 'Category 1',
        rating: 4.5,
        stock: 10
      },
      {
        id: 2,
        name: 'Product 2',
        description: 'Description of Product 2',
        image: '../../../assets/img/banner/img1.jpg',
        price: 150,
        category: 'Category 2',
        rating: 4.0,
        stock: 5
      },
      {
        id: 3,
        name: 'Product 3',
        description: 'Description of Product 3',
        image: '../../../assets/img/banner/img1.jpg',
        price: 200,
        category: 'Category 3',
        rating: 5.0,
        stock: 8
      },
      {
        id: 4,
        name: 'Product 4',
        description: 'Description of Product 4',
        image: '../../../assets/img/banner/img1.jpg',
        price: 250,
        category: 'Category 4',
        rating: 3.5,
        stock: 12
      },
      {
        id: 1,
        name: 'Product 1',
        description: 'Description of Product 1',
        image: '../../../assets/img/banner/img1.jpg',
        price: 100,
        category: 'Category 1',
        rating: 4.5,
        stock: 10
      },
      {
        id: 2,
        name: 'Product 2',
        description: 'Description of Product 2',
        image: '../../../assets/img/banner/img1.jpg',
        price: 150,
        category: 'Category 2',
        rating: 4.0,
        stock: 5
      },
      {
        id: 3,
        name: 'Product 3',
        description: 'Description of Product 3',
        image: '../../../assets/img/banner/img1.jpg',
        price: 200,
        category: 'Category 3',
        rating: 5.0,
        stock: 8
      },
      {
        id: 4,
        name: 'Product 4',
        description: 'Description of Product 4',
        image: '../../../assets/img/banner/img1.jpg',
        price: 250,
        category: 'Category 4',
        rating: 3.5,
        stock: 12
      }
    ]

    this.responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];
  }

  adicionarAoCarrinho(produto: any) {
    this.jornadaStorage.adicionarItemCarrinho(produto);
  }

  comprar(produto: any) {
    this.jornadaStorage.adicionarItemCarrinho(produto);
    this.routes.navigate(['/carrinho']);
  }
}
