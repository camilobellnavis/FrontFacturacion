import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  myAppUrl = 'https://facturacionbell20220530010340.azurewebsites.net/';
  myApiUrl = 'api/Producto/'; 
/*   myAppUrl = 'https://bellnavisaeropuerto.azurewebsites.net/';
  myApiUrl = 'api/Login/'; */

  constructor(private http: HttpClient) { }

  getProducto(id:number):Observable<any>{

    return this.http.get(this.myAppUrl + this.myApiUrl + id);

  }

  getListProductos(): Observable<any>{

    return this.http.get(this.myAppUrl + this.myApiUrl);

  }

  deleteProducto(id: number):Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }
  saveProducto(producto:Producto):Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl,producto);
  }
  updateProducto(id:number,producto:Producto):Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id,producto);
  }
}
