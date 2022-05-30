import { Component, OnInit } from '@angular/core';
import { Venta } from '../../interfaces/venta';
import { VentaService } from '../../services/venta.service';


@Component({
  selector: 'app-list-ventas',
  templateUrl: './list-ventas.component.html',
  styleUrls: ['./list-ventas.component.css']
})
export class ListVentasComponent implements OnInit {
  img ="../assets/img/inmarket.png";
  listventas: Venta[] = [

    /* {ciudadorigen:'cali',ciudaddestino:'Medellin',fecha:new Date(),horasalida:1,horallegada:2,numerodevuelo:1,estado:'volando',aerolinea:'avianca'},
    {ciudadorigen:'telaviv',ciudaddestino:'bogotá',fecha:new Date(),horasalida:1,horallegada:2,numerodevuelo:1,estado:'espera',aerolinea:'telraviv'}
 */
  ]


  constructor(private _ventaService:VentaService) { }

  ngOnInit(): void {
    this.getVentas();
  }
  getVentas(){

    this._ventaService.getListVentas().subscribe(data => {
      this.listventas= data;
    }, error => {
      console.log(error);
    });
  }




}