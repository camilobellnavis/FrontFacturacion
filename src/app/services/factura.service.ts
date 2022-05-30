import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from '../interfaces/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  myAppUrl = 'https://facturacionbell20220530010340.azurewebsites.net/';
  myApiUrl = 'api/Factura/'; 
/*   myAppUrl = 'https://bellnavisaeropuerto.azurewebsites.net/';
  myApiUrl = 'api/Login/'; */

  constructor(private http: HttpClient) { }

  getFactura(id:number):Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + id);
  }

  getListFacturas(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  deleteFactura(id: number):Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  saveFactura(factura:Factura):Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl,factura);
  }

}
