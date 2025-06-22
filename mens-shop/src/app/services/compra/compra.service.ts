import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PATHS_URL } from '../../const/paths-url.const';
import { JornadaServiceService } from '../../storage/jornada-service.service';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
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

  get pathCompra() {
    return PATHS_URL.COMPRA(this.jornadaService.getUser().id);
  }

  relizarCompra(): Observable<any> {
    return this.httpService.post(
      this.pathCompra,
      this.jornadaService.getCompra(),
      {
        headers: this.headers.reduce((acc, header) => {
          acc[header.name] = header.value;
          return acc;
        }, {})
      }
    );
  }

  minhasCompras(): Observable<any> {
    return this.httpService.get(
       this.pathCompra,
      {
        headers: this.headers.reduce((acc, header) => {
          acc[header.name] = header.value;
          return acc;
        }, {})
      }
    );
  }
}
