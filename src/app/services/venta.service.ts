import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Venta } from '../interfaces/venta';


@Injectable({
  providedIn: 'root'
})
export class VentaService {

  myAppUrl = 'https://facturacionbell20220530010340.azurewebsites.net/';
  myApiUrl = 'api/Detalle/'; 
/*   myAppUrl = 'https://bellnavisaeropuerto.azurewebsites.net/';
  myApiUrl = 'api/Login/'; */

  constructor(private http: HttpClient) { }

  getVenta(id:number):Observable<any>{

    return this.http.get(this.myAppUrl + this.myApiUrl + id);

  }

  getListVentas(): Observable<any>{

    return this.http.get(this.myAppUrl + this.myApiUrl);

  }

  deleteVenta(id: number):Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }
  saveVenta(venta:Venta):Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl,venta);
  }


}
