import { Component, inject } from '@angular/core';
import { EntryPointComponent } from '../../components/entry-point/entry-point.component';
import { PrimeModule } from '../../shared/prime-module/prime.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import { IUser } from '../../interfaces/user.interface';
import { JornadaServiceService } from '../../storage/jornada-service.service';
import { ROTAS } from '../../const/rotas.const';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [EntryPointComponent, PrimeModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [LoginService],
})
export class LoginComponent {
  formBuilder = inject(FormBuilder);
  loginService = inject(LoginService);
  notification = inject(ConfirmationService);
  jornadaService = inject(JornadaServiceService);
  route = inject(Router)
  enviarLink = false;
  esqueciSenha = false;

  formLogin = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required]
  });

  entrar(){
    if (this.formLogin.valid){
      this.loginService.login()
        .subscribe({
          next: (response: IUser) => {
            this.jornadaService.setUser(response);
            this.route.navigate([ROTAS.HOME]);
          },
          error: (err) => {
            this.notification.confirm({
              message: 'Erro ao realizar login, tente novamente!',
              header: 'Erro',
              icon: 'pi pi-exclamation-triangle',
              acceptLabel: 'Ok',
              accept: () => {
                this.enviarLink = false;
                this.esqueciSenha = false;
              },
              rejectVisible: false,
            });
          }
        });
    } else this.alertaFormularioInvalido();
  }

  alertaFormularioInvalido() {
    this.notification.confirm({
      message: 'Preencha todos os campos corretamente!',
      header: 'Erro',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Ok',
      accept: () => {
        this.enviarLink = false;
        this.esqueciSenha = false;
      }
    });
  }
}
