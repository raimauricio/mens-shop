import { Component, OnInit, inject } from '@angular/core';
import { PrimeModule } from '../../shared/prime-module/prime.module';
import { JornadaServiceService } from '../../storage/jornada-service.service';
import { Router } from '@angular/router';
import { responsiveOptions } from '../../const/responsive-options.const';
import { IProduct } from '../../interfaces/product.interface';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-products-panel',
  standalone: true,
  imports: [PrimeModule, FormsModule],
  templateUrl: './products-panel.component.html',
  styleUrl: './products-panel.component.scss',
})


export class ProductsPanelComponent implements OnInit {
  jornadaStorage = inject(JornadaServiceService);
  routes = inject(Router);
  message = inject(MessageService);
  confirmation = inject(ConfirmationService);
  responsiveOptions = responsiveOptions.productPanel;
  products: IProduct[] = [];

  ngOnInit() {
    this.products = [
      {
        id: 1,
        nome: 'Product 1',
        descricao: 'Description of Product 1',
        imagem: '../../../assets/img/banner/img1.jpg',
        preco: 100,
        categoria: 'Category 1',
        tamanhos: [38, 40, 42, 44, 46],
      },
      {
        id: 2,
        nome: 'Product 2',
        descricao: 'Description of Product 2',
        imagem: '../../../assets/img/banner/img1.jpg',
        preco: 150,
        categoria: 'Category 2',
        tamanhos: [38, 40, 42, 44, 46],
      },
      {
        id: 3,
        nome: 'Product 3',
        descricao: 'Description of Product 3',
        imagem: '../../../assets/img/banner/img1.jpg',
        preco: 200,
        categoria: 'Category 3',
        tamanhos: [38, 40, 42, 44, 46],
      },
      {
        id: 4,
        nome: 'Product 4',
        descricao: 'Description of Product 4',
        imagem: '../../../assets/img/banner/img1.jpg',
        preco: 250,
        categoria: 'Category 4',
        tamanhos: [38, 40, 42, 44, 46],
      },
      {
        id: 5,
        nome: 'Product 5',
        descricao: 'Description of Product 5',
        imagem: '../../../assets/img/banner/img1.jpg',
        preco: 250,
        categoria: 'Category 4',
        tamanhos: [38, 40, 42, 44, 46],
      },
      {
        id: 6,
        nome: 'Product 6',
        descricao: 'Description of Product 6',
        imagem: '../../../assets/img/banner/img1.jpg',
        preco: 250,
        categoria: 'Category 4',
        tamanhos: [38, 40, 42, 44, 46],
      },
      {
        id: 7,
        nome: 'Product 7',
        descricao: 'Description of Product 7',
        imagem: '../../../assets/img/banner/img1.jpg',
        preco: 250,
        categoria: 'Category 4',
        tamanhos: [38, 40, 42, 44, 46],
      },
      {
        id: 8,
        nome: 'Product 8',
        descricao: 'Description of Product 8',
        imagem: '../../../assets/img/banner/img1.jpg',
        preco: 250,
        categoria: 'Category 4',
        tamanhos: [38, 40, 42, 44, 46],
      },
      {
        id: 9,
        nome: 'Product 9',
        descricao: 'Description of Product 9',
        imagem: '../../../assets/img/banner/img1.jpg',
        preco: 250,
        categoria: 'Category 4',
        tamanhos: [38, 40, 42, 44, 46],
      },
      {
        id: 10,
        nome: 'Product 10',
        descricao: 'Description of Product 10',
        imagem: '../../../assets/img/banner/img1.jpg',
        preco: 250,
        categoria: 'Category 4',
        tamanhos: [38, 40, 42, 44, 46],
      }
    ];
  }

  adicionarAoCarrinho(produto: IProduct, comprar = false) {
    if (produto.tamanhoSelecionado) {
      this.jornadaStorage.adicionarItemCarrinho(
        {...produto,tamanhoSelecionado: produto.tamanhoSelecionado}
      );
      this.message.add({
        severity: 'success',
        summary: 'Produto adicionado ao carrinho!',
        detail: `Produto ${produto.nome} adicionado com sucesso!`,
        life: 3000
      });
      if (comprar) {
        this.routes.navigate(['/carrinho']);
      }
    } else {
      this.confirmation.confirm({
        message: 'Selecione um tamanho para o produto!',
        header: 'Tamanho não selecionado',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Ok',
        acceptIcon: null,
        rejectVisible: false,
      });
    }
  }

  comprar(produto: IProduct) {
    this.adicionarAoCarrinho(produto, true);
  }

  montaOptions(tamanhos: string[]) {
    return tamanhos.map(tamanho => ({ name: tamanho, code: tamanho }));
  }
}
