import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../interfaces/user.interface';
import { PATHS_URL } from '../../const/paths-url.const';
import { IRegistro } from '../../interfaces/registro.interface';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
   httpService = inject(HttpClient);

    registrar(registro: IRegistro): Observable<any> {
      return this.httpService.post<any>(
        PATHS_URL.REGISTRO,
        registro,
      );
    }
}
