import { Component } from '@angular/core';
import { PrimeModule } from '../../shared/prime-module/prime.module';
import { BasePageComponent } from '../../components/base-page/base-page.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import * as QRCode from 'qrcode';
import { CommonModule } from '@angular/common';
import { ResumeCartComponent } from '../../components/resume-cart/resume-cart.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    ResumeCartComponent,
    PrimeModule,
    ReactiveFormsModule,
    BasePageComponent,
    CommonModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  cartItems = [
    { name: 'Camisa Polo', price: 100, quantity: 2 },
    { name: 'Bermuda Jeans', price: 150, quantity: 1 },
  ];
  selectedPayment: string = '';
  selectedCard: any = null;

  savedCards = [
    { id: 1, name: 'Visa', lastDigits: '1234' },
    { id: 2, name: 'Mastercard', lastDigits: '5678' },
  ];

  metodosPagamento = [
    { tipo: 'pix', nome: 'Pix', icone: 'pi pi-qrcode' },
    { tipo: 'credito', nome: 'Crédito', icone: 'pi pi-credit-card' },
    { tipo: 'debito', nome: 'Débito', icone: 'pi pi-credit-card' },
    { tipo: 'boleto', nome: 'Boleto', icone: 'pi pi-file' }
  ];

  formGroup: FormGroup;
  chavePix = 'sua-chave@pix.com.br';
  nomeRecebedor = 'MensShop';
  cidade = 'Santos';
  qrCodeDataUrl: string = '';
  boleto = {
    nome: '',
    cpf: '',
    email: ''
  };
  boletoEnviado = false;
  modalCartaoAberta = false;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      selectedCategory: [''],
    })
  }

  selecionarMetodo(metodo: any) {
    this.selectedPayment = metodo;
    if (metodo === 'pix') {
      this.gerarQrCodePix();
    }
  }

  getTotal() {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  selectCard(card: any) {
    this.selectedCard = card;
  }

  get qrCodePixPayload(): string {
    const valorFormatado = this.getTotal().toFixed(2).replace('.', '');
    const payload = `00020126440014br.gov.bcb.pix0114${this.chavePix}520400005303986540${valorFormatado}5802BR5913${this.nomeRecebedor}6009${this.cidade}62070503***6304`;
    return payload;
  }

  async gerarQrCodePix() {
    try {
      this.qrCodeDataUrl = await QRCode.toDataURL(this.qrCodePixPayload, {
        width: 256,
        margin: 2,
      });
    } catch (err) {
      console.error('Erro ao gerar QR Code', err);
    }
  }

  copiarCodigoPix() {
    navigator.clipboard.writeText(this.qrCodePixPayload).then(() => {
      alert('Código Pix copiado!');
    });
  }

  enviarBoleto() {
    const { nome, cpf, email } = this.boleto;
    setTimeout(() => {
      this.boletoEnviado = true;
    }, 1000);
  }
}
