import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PATHS_URL } from '../../const/paths-url.const';
import { Observable } from 'rxjs';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  httpService = inject(HttpClient);

  login(email: string, senha: string): Observable<HttpResponse<IUser>> {
    return this.httpService.post<IUser>(
      PATHS_URL.LOGIN,
      {
        email: email,
        senha: senha
      },
      { observe: 'response' }
    );
  }
}
