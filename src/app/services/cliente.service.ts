import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  myAppUrl = 'https://facturacionbell20220530010340.azurewebsites.net/';
  myApiUrl = 'api/Cliente/'; 
/*   myAppUrl = 'https://bellnavisaeropuerto.azurewebsites.net/';
  myApiUrl = 'api/Login/'; */

  constructor(private http: HttpClient) { }

  getCliente(id:number):Observable<any>{

    return this.http.get(this.myAppUrl + this.myApiUrl + id);

  }

  getListClientes(): Observable<any>{

    return this.http.get(this.myAppUrl + this.myApiUrl);

  }

  deleteCliente(id: number):Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }
  saveCliente(cliente:Cliente):Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl,cliente);
  }

}
