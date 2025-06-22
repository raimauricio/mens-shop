import { IEndereco, ICartao } from './../../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JornadaServiceService } from '../../storage/jornada-service.service';
import { PATHS_URL } from '../../const/paths-url.const';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  httpService = inject(HttpClient);
  jornadaService = inject(JornadaServiceService);

    get headers() {
      return [
        {
          name: 'Authorization',
          value: `${this.jornadaService.getTokenUsuario()}`
        },
        {
          name: 'Content-Type',
          value: 'application/json'
        }
      ]
    }

    atualizarUsuario(atualizacao: {
      endereco: IEndereco,
      cartao: ICartao,
      carrinho: any[]
    }): Observable<any> {
      return this.httpService.put<any>(
        PATHS_URL.USUARIO(this.jornadaService.getUser().id),
        atualizacao,
        {
          headers: this.headers.reduce((acc, header) => {
            acc[header.name] = header.value;
            return acc;
          }, {})
        }
      );
    }
}
