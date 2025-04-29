import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PATHS_URL } from '../const/paths-url.const';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  httpService = inject(HttpClient);

  login(): Observable<IUser> {
    return this.httpService.post<IUser>(
      PATHS_URL.LOGIN,
      null
    );
  }
}
