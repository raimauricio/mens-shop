import { Component, EventEmitter, inject, Output } from '@angular/core';
import { PrimeModule } from '../../shared/prime-module/prime.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { JornadaServiceService } from '../../storage/jornada-service.service';
import { IEndereco } from '../../interfaces/user.interface';
import { Lojas } from '../../const/lojas.const';

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
  lojas = Lojas;
  metodoSelecionadao = null;
  lojaSelecionada = null;
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
      this.selecionaEndereco({...this.formNovoEndereco.value, id: 0});
      this.modalNovoEndereco = false;
      this.formNovoEndereco.reset();
    }
  }

  selecionaMetodo(){
    this.lojaSelecionada = null;
    this.formaRecebimentoAdicionada.emit(false);
  }

  selecionaLoja() {
    this.jornadaStorage.adicionaRetiradaLoja(this.lojaSelecionada?.id);
    this.formaRecebimentoAdicionada.emit(true);
  }

  selecionaEndereco(endereco: IEndereco) {
    this.jornadaStorage.adicionaEnderecoEntrega(endereco)
    this.enderecoSelecionado = endereco;
    this.formaRecebimentoAdicionada.emit(true);
  }
}
