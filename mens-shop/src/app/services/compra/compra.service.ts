import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PATHS_URL } from '../../const/paths-url.const';
import { ICompra } from '../../interfaces/compra.interface';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  httpService = inject(HttpClient);

  compra(): Observable<any> {
    return this.httpService.post(
      PATHS_URL.COMPRA,
      null
    );
  }
}
