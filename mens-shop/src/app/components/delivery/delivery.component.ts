import { Component, EventEmitter, inject, Output } from '@angular/core';
import { PrimeModule } from '../../shared/prime-module/prime.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { JornadaServiceService } from '../../storage/jornada-service.service';
import { IEndereco } from '../../interfaces/user.interface';
import { ILoja } from '../../interfaces/compra.interface';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [PrimeModule, FormsModule, ReactiveFormsModule],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss'
})
export class DeliveryComponent {
  @Output() formaRecebimentoAdicionada = new EventEmitter<boolean>();
  jornadaStorage = inject(JornadaServiceService);
  formBuilder = inject(FormBuilder);
  metodosDeRecebimento = [
    { tipo: 'retirada', nome: 'Retirada em loja', icone: 'pi pi-shop' },
    { tipo: 'entrega', nome: 'Entrega', icone: 'pi pi-truck' }
  ];
  lojas = [
    { id: 1, nome: 'Loja Santos', endereco: 'Av. Ana Costa, 123' },
    { id: 2, nome: 'Loja São Paulo', endereco: 'Av. Paulista, 456' },
    { id: 3, nome: 'Loja Rio de Janeiro', endereco: 'Av. Atlântica, 789' }
  ];
  metodoSelecionadao = null;
  lojaSelecionada: ILoja = null;
  enderecoSelecionado: IEndereco = null;
  modalNovoEndereco = false;
  formNovoEndereco: FormGroup = this.formBuilder.group({
    logradouro: ['', Validators.required],
    numero: ['',Validators.required],
    complemento: [''],
    bairro: ['',Validators.required],
    cidade: ['',Validators.required],
    estado: ['',Validators.required],
    cep: ['',Validators.required]
  });

  get enderecosCadastrados() {
    return this.jornadaStorage.getEnderecoCliente();
  }

  cadastrarEndereco() {
    if(this.formNovoEndereco.valid) {
      this.jornadaStorage.setEnderecoCliente(this.formNovoEndereco.value);
      this.selecionaEndereco(this.formNovoEndereco.value);
      this.modalNovoEndereco = false;
      this.formNovoEndereco.reset();
    }
  }

  selecionaMetodo(){
    this.lojaSelecionada = null;
    this.formaRecebimentoAdicionada.emit(false);
  }

  selecionaLoja() {
    this.jornadaStorage.adicionaRetiradaLoja(this.lojaSelecionada);
    this.formaRecebimentoAdicionada.emit(true);
  }

  selecionaEndereco(endereco: IEndereco) {
    this.jornadaStorage.adicionaEnderecoEntrega(endereco)
    this.enderecoSelecionado = endereco;
    this.formaRecebimentoAdicionada.emit(true);
  }
}
