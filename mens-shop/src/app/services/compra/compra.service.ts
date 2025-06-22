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

  compra(): Observable<any> {
    const headers = [
      {
        name: 'Authorization',
        value: `${this.jornadaService.getTokenUsuario()}`
      },
      {
        name: 'Content-Type',
        value: 'application/json'
      }
    ]

    return this.httpService.post(
      PATHS_URL.COMPRA(this.jornadaService.getUser().id),
      this.jornadaService.getCompra(),
      {
        headers: headers.reduce((acc, header) => {
          acc[header.name] = header.value;
          return acc;
        }, {})
      }
    );
  }
}
