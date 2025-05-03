import { Component, EventEmitter, inject, Output } from '@angular/core';
import { PrimeModule } from '../../shared/prime-module/prime.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import * as QRCode from 'qrcode';
import { JornadaServiceService } from '../../storage/jornada-service.service';
import { ConfirmationService } from 'primeng/api';
import { ICartao } from '../../interfaces/user.interface';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [PrimeModule, FormsModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  @Output() formaPagamentoAdicionada = new EventEmitter<boolean>();
  jornadaService = inject(JornadaServiceService);
  formBuilder = inject(FormBuilder);
  confirmationService = inject(ConfirmationService);
  cartaoSelecionado: any = null;
  modalCartaoAberto = false;
  modalBoletoAberto = false;
  modalPixAberto = false;
  metodoCartaoSelecionado = false;
  metodoSelecionado = null;
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
  formCartao = this.formBuilder.group({
    nomeTitular: ['', Validators.required],
    numeroCartao: [''],
    validade: ['', Validators.required],
    cvv: ['', [Validators.required]],
  });
  formBoleto = this.formBuilder.group({
    nomeCompleto: ['', Validators.required],
    cpf: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });
  formPagamento = this.formBuilder.group({
    metodoPagamento: ['', Validators.required]
  });

  get qrCodePixPayload(): string {
    const valorFormatado = this.jornadaService.getValorTotalCompras().toFixed(2).replace('.', '');
    const payload = `00020126440014br.gov.bcb.pix0114${this.chavePix}520400005303986540${valorFormatado}5802BR5913${this.nomeRecebedor}6009${this.cidade}62070503***6304`;
    return payload;
  }

  get cartoesCadastrados() {
    return this.jornadaService.getCartoesCadastrados();
  }

  selecionarMetodo() {
    switch (this.metodoSelecionado) {
      case 'credito':
      case 'debito':
        this.metodoCartaoSelecionado = true;
        this.modalBoletoAberto = false;
        this.modalPixAberto = false;
        break;
      case 'boleto':
        this.modalBoletoAberto = true;
        this.modalCartaoAberto = false;
        this.modalPixAberto = false;
        break;
      case 'pix':
        this.modalPixAberto = true;
        this.modalCartaoAberto = false;
        this.modalBoletoAberto = false;
        this.gerarQrCodePix();
        break;
      default:
        this.modalCartaoAberto = false;
        this.modalBoletoAberto = false;
        this.modalPixAberto = false;
    }
  }

  async gerarQrCodePix() {
    try {
      this.qrCodeDataUrl = await QRCode.toDataURL(this.qrCodePixPayload, {
        width: 256,
        margin: 2,
      });
      this.formaPagamentoAdicionada.emit(true);
    } catch (err) {
      this.confirmationService.confirm({
        message: `Não foi possível gerar o QR Code. Tente novamente mais tarde.`,
        header: 'Erro ao gerar QR Code',
        icon: 'pi pi-times',
        acceptLabel: 'Ok',
        accept: () => {
          this.modalPixAberto = false;
        },
        rejectVisible: false,
      });
    }
  }

  selecionarCartao(cartao: ICartao) {
    this.cartaoSelecionado = cartao;
    this.formaPagamentoAdicionada.emit(true);
  }

  salvarNovoCartao() {
    if (this.formCartao.valid) {
      const cartao: ICartao = {
        nome: this.formCartao.value.nomeTitular,
        numero: this.formCartao.value.numeroCartao,
        validade: this.formCartao.value.validade,
        cvv: this.formCartao.value.cvv,
      };
      this.jornadaService.adicionarCartao(cartao);
      this.modalCartaoAberto = false;
      this.selecionarCartao(cartao);
    }
  }

  copiarCodigoPix() {
    this.confirmationService.confirm({
      message: `Código Pix copiado com sucesso! Realize o pagamento e finalize sua compra.`,
      header: 'Código copiado',
      icon: 'pi pi-check',
      acceptLabel: 'Ok',
      accept: () => {
        this.modalPixAberto = false;
      },
      rejectVisible: false,
    });
  }

  enviarBoleto() {
    if(this.formBoleto.valid){
      this.confirmationService.confirm({
        message: `Boleto enviado para o seu e-mail, caso não encontre verifica a caixa de spam. Realize o pagamento em até 3 dias úteis para confirmar a compra.`,
        header: 'Boleto enviado',
        icon: 'pi pi-check',
        acceptLabel: 'Ok',
        accept: () => {
          this.modalBoletoAberto = false;
        },
        rejectVisible: false,
      });
      this.formaPagamentoAdicionada.emit(true);
    }
  }
}
