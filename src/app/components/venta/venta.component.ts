import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VentaService } from '../../services/venta.service';
import { Venta } from '../../interfaces/venta';
import { Producto } from '../../interfaces/producto';
import { ProductoService } from '../../services/producto.service';
import { Factura } from '../../interfaces/factura';
import { Cliente } from '../../interfaces/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { FacturaService } from '../../services/factura.service';



@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
  providers:[ProductoService]
})
export class VentaComponent implements OnInit {
  var=0;
  agregarventa: FormGroup;
  id=0;
  idf=0;
  idc=0;
  idv=0;
  idproducto=0;
  venta: Venta | undefined;
  factura: Factura |undefined;
  cliente: Cliente |undefined;
  fechaf = new Date();
  public listproductos: Producto[]=[];
  public selectprod: Producto = {id:0,nombre:'',precio:0,stock:0}

  constructor(private fb:FormBuilder,
    private _ventaService:VentaService, 
    private _productoService:ProductoService,
    private _clienteService:ClienteService,
    private _facturaService:FacturaService,
    private _router:Router,
    private aRoute:ActivatedRoute) {
    
    this.idc =+this.aRoute.snapshot.paramMap.get('id')!;
      this.agregarventa= this.fb.group({
        id:['',Validators.required],
        id_factura:['',Validators.required],
        id_producto:['',Validators.required],
        precio:['',Validators.required],
        cantidad:['',Validators.required],
        importe:['',Validators.required],
      })
      //this.id = +this.aRoute.snapshot.paramMap.get('id')!;
    }
    

  ngOnInit(): void {
    this.esEdit();
    this.listproductos= this.getProductos();
    this.getClient();
    
  }

  esEdit(){
    if(this.id !== 0){
      
      this._ventaService.getVenta(this.id).subscribe(data =>{
        this.venta=data;
        this.agregarventa.patchValue({
          id_factura: data.id_factura,
          id_producto: data.id_producto,
          precio: data.precio,
          cantidad: data.cantidad,
          importe: data.importe
        })
      },error =>{
        console.log(error);
      });
      
    }
  }

  programarEditar(){

    //if(this.venta ==undefined){
    console.log("Id de Venta"+this.idv)
    console.log("Id de Factura"+this.idf)
      //Agregamos un nuevo viaje
      const factura: Factura = {
        fecha: this.fechaf,
        idcliente: this.idc, 
      }

      this._facturaService.saveFactura(factura).subscribe(data => {
        const venta: Venta = {
          id_factura: data.id,
          id_producto: this.agregarventa.get('id_producto')?.value,
          precio: this.agregarventa.get('precio')?.value,
          cantidad: this.agregarventa.get('cantidad')?.value,
          importe: this.agregarventa.get('precio')?.value * this.agregarventa.get('cantidad')?.value,
        //}  
      }
      this.selectprod.stock = this.selectprod.stock - venta.cantidad;
    this._productoService.updateProducto(venta.id_producto, this.selectprod).subscribe(data =>{
      
      console.log("Se edito exitosamente");
    },error =>{
     
      console.log(error);
      
    });
      
      this.guardarVenta(venta);
      
         console.log("Se guardó factura exitosamente"+data.id);
       }, error => {
         console.log(error);
       });

    
  }

  async guardarVenta(venta:Venta){
    this._ventaService.saveVenta(venta).subscribe(data => {
      this.idv = data.id;
     console.log("Se guardó venta exitosamente");
     this._router.navigate(['/detalle',this.idv]);
   }, error => {
     console.log(error);
   });
  }

  public getProductos(){
    this._productoService.getListProductos().subscribe(data => {
      this.listproductos= data;
      //console.log(this.listusuarios);
      console.log(this.listproductos);
    }, error => {
      console.log(error);
    });
    return this.listproductos
  }

  onSelect(){

    const venta: Venta = {
      id:0,
      id_factura: 0,
      id_producto: this.agregarventa.get('id_producto')?.value,
      precio: this.agregarventa.get('precio')?.value,
      cantidad: this.agregarventa.get('cantidad')?.value,
      importe: this.agregarventa.get('importe')?.value,
    }

    this._productoService.getProducto(venta.id_producto).subscribe(data => {
      this.selectprod= data;
      this.agregarventa.patchValue({
        id_factura: null,
        id_producto: data.id,
        precio: data.precio,
        cantidad: null,
        importe: this.agregarventa.get('precio')?.value * this.agregarventa.get('cantidad')?.value,
      })
      //console.log(this.listusuarios);
      console.log(this.selectprod);
    }, error => {
      console.log(error);
    });

    
    console.log(venta)
  }
  onCalc(){

    const venta: Venta = {
      id:0,
      id_factura: 0,
      id_producto: this.agregarventa.get('id_producto')?.value,
      precio: this.agregarventa.get('precio')?.value,
      cantidad: this.agregarventa.get('cantidad')?.value,
      importe: this.agregarventa.get('importe')?.value,
    }

    this._productoService.getProducto(venta.id_producto).subscribe(data => {
      this.selectprod= data;
      this.agregarventa.patchValue({
        id_factura: null,
        id_producto: data.id,
        precio: data.precio,
        cantidad: this.agregarventa.get('cantidad')?.value,
        importe: this.agregarventa.get('precio')?.value * this.agregarventa.get('cantidad')?.value,
      })
      //console.log(this.listusuarios);
      console.log(this.selectprod);
    }, error => {
      console.log(error);
    });

    
    console.log(venta)
  }

  getClient(){
    this._clienteService.getCliente(this.idc).subscribe(data => {
      this.cliente= data;
     
    }, error => {
      console.log(error);
    });
    }
  
  
}
