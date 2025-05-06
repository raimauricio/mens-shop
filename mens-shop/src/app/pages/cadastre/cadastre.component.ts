import { EntryPointComponent } from './../../components/entry-point/entry-point.component';
import { Component, inject } from '@angular/core';
import { PrimeModule } from '../../shared/prime-module/prime.module';
import { ROTAS } from '../../const/rotas.const';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastre',
  standalone: true,
  imports: [EntryPointComponent, FormsModule, PrimeModule, ReactiveFormsModule],
  templateUrl: './cadastre.component.html',
  styleUrl: './cadastre.component.scss'
})
export class CadastreComponent {
  rotas = ROTAS;
  termosAceitos = false;
  formBuilder = inject(FormBuilder);
  confirmationService = inject(ConfirmationService);
  router = inject(Router);

  get aceitouTermos(): boolean{
    return this.formCadastro.get('termos').value;
  }

  formCadastro = this.formBuilder.group({
    nome: ['',[Validators.required]],
    sobrenome: ['',[Validators.required]],
    email: ['',[Validators.required, Validators.email]],
    telefone: ['',[Validators.required]],
    senha: ['',[Validators.required]],
    confirmarSenha: ['',[Validators.required]],
    termos: [false]
  });

  cadastroValido(){
    return this.formCadastro.valid &&
    this.formCadastro.get('senha').value === this.formCadastro.get('confirmarSenha').value;
  }

  cadastrese() {
    this.confirmationService.confirm({
      rejectVisible: false,
      acceptLabel: 'Ok',
      header: this.cadastroValido() ? 'Cadastro realizado.' : 'Erro ao cadastrar',
      message:  this.cadastroValido() ? 'Cadastro realizado com sucesso realizae o login para continuar com as compras.' : 'Erro ao realizar o cadastro valide os dados e tente novamente',
      accept: this.cadastroValido() ? () => this.router.navigate([this.rotas.LOGIN]) : () => {return}
    });
  }
}
