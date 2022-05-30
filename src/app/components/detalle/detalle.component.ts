import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VentaService } from '../../services/venta.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  img ="../assets/img/inmarketlogo.png";
  id: number;
  venta: any;
  constructor(private aRoute:ActivatedRoute, private _ventaService:VentaService) {
    this.aRoute.snapshot.paramMap.get('id');
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
    //console.log(this.aRoute.snapshot.paramMap.get('id'));
   }

  ngOnInit(): void {
    this.getVenta();
  }

  getVenta(){
    this._ventaService.getVenta(this.id).subscribe(data =>{
    this.venta = data;
    })
  }

}
