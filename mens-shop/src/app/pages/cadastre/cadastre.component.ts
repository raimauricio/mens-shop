import { EntryPointComponent } from './../../components/entry-point/entry-point.component';
import { Component, inject } from '@angular/core';
import { PrimeModule } from '../../shared/prime-module/prime.module';
import { ROTAS } from '../../const/rotas.const';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RegistroService } from '../../services/registro/registro.service';

@Component({
  selector: 'app-cadastre',
  standalone: true,
  imports: [EntryPointComponent, FormsModule, PrimeModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './cadastre.component.html',
  styleUrl: './cadastre.component.scss',
  providers: [RegistroService]
})
export class CadastreComponent {
  rotas = ROTAS;
  termosAceitos = false;
  formBuilder = inject(FormBuilder);
  confirmationService = inject(ConfirmationService);
  router = inject(Router);
  registroService = inject(RegistroService);

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
    const form = this.formCadastro.value;
    if(!this.cadastroValido()) return;
    this.registroService.registrar(
      {
        nome: form.nome,
        sobrenome: form.sobrenome,
        email: form.email,
        senha: form.senha,
        telefone: form.telefone
      }
    ).subscribe({
      next: () => {
        this.confirmationService.confirm({
          rejectVisible: false,
          acceptLabel: 'Ok',
          header: 'Cadastro realizado.',
          message: 'Cadastro realizado com sucesso, realize o login para continuar com as compras.',
          accept: () => this.router.navigate([this.rotas.LOGIN])
        });
      },
      error: (error) => {
        this.confirmationService.confirm({
          rejectVisible: false,
          acceptLabel: 'Ok',
          header: 'Erro ao cadastrar',
          message: 'Erro ao realizar o cadastro, valide os dados e tente novamente.',
          accept: () => { return; }
        });
      }
    });
  }
}
