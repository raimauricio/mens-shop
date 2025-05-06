import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../../interfaces/product.interface';
import { PATHS_URL } from '../../const/paths-url.const';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  httpClient = inject(HttpClient);
  constructor() { }

  getProdutos(): Observable<IProduct[]>{
    return this.httpClient.get<IProduct[]>(PATHS_URL.PRODUCTS);
  }
}
