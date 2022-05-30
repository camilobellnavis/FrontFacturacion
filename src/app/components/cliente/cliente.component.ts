import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from '../../interfaces/cliente';
import { DatePipe } from '@angular/common';
import { Producto } from '../../interfaces/producto';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  agregarcliente: FormGroup;
  
  id=0;
  idSeleccion=0;
  cliente: any;
  res: any;
  existe= false;
  listclientes: Cliente[] = [

    /* {ciudadorigen:'cali',ciudaddestino:'Medellin',fecha:new Date(),horasalida:1,horallegada:2,numerodevuelo:1,estado:'volando',aerolinea:'avianca'},
    {ciudadorigen:'telaviv',ciudaddestino:'bogotá',fecha:new Date(),horasalida:1,horallegada:2,numerodevuelo:1,estado:'espera',aerolinea:'telraviv'}
 */
  ]

  constructor(private fb:FormBuilder,
    private _clienteService:ClienteService, 
    private _router:Router,
    private aRoute:ActivatedRoute) {

      this.agregarcliente= this.fb.group({
        id:['',Validators.required],
        nombre:['',Validators.required],
        apellido:['',Validators.required],
        direccion:['',Validators.required],
        fecha_nacimiento:['',Validators.required],
        telefono:['',Validators.required],
        email:['',Validators.required],
        edad:['',Validators.required],
      })
    }
    

  ngOnInit(): void {
    this.esLogin();
    this.getUser()
  }

  capturar(){
    console.log(this.idSeleccion);
    this.agregarcliente= this.fb.group({
      id:this.idSeleccion,
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      direccion:['',Validators.required],
      telefono:['',Validators.required],
      email:['',Validators.required],
      edad:['',Validators.required],
    })
    this.id = this.idSeleccion;
    this.esLogin();
    
  }
  getUser(){
      console.log('camilo');
      this._clienteService.getListClientes().subscribe(data => {
      this.listclientes= data;
      //console.log(this.listusuarios);
    }, error => {
      console.log(error);
    });
  }


  esLogin(){
    const datepipe: DatePipe = new DatePipe('en-US');
    console.log("Es login: "+this.id);
    if(this.id !== 0){
      
      this._clienteService.getCliente(this.id).subscribe(data =>{
        this.cliente=data;
        console.log(this.cliente)
        this.agregarcliente= this.fb.group({
          nombre:data.nombre,
          apellido:data.apellido,
          direccion:data.direccion,
          telefono:data.telefono,
          email:data.email,
          edad:data.edad,
        })
        this.existe= true;
        console.log(this.existe);
        
      },error =>{
        console.log(error);
        this.existe= false;
      });
      
    }
  
  }
  loginRegistrar(){
    
    console.log(this.cliente);
    if(this.cliente == undefined){

      //Registramos un User
      const cliente = {
        id: this.agregarcliente.get('id')?.value,
        nombre: this.agregarcliente.get('nombre')?.value,
        apellido: this.agregarcliente.get('apellido')?.value,
        direccion:this.agregarcliente.get('direccion')?.value,
        telefono:this.agregarcliente.get('telefono')?.value,
        email:this.agregarcliente.get('email')?.value,
        edad:this.agregarcliente.get('edad')?.value,
      }

      console.log(cliente);
      
      this._clienteService.saveCliente(cliente).subscribe(data =>{
        
        //this.toastr.success('El cliente se guardó con Exito', 'Registro Guardado');
        this._router.navigate(['/venta',cliente.id]);
        //[routerLink]="['/ver',vuelo.id]"
        console.log('Guardo');
      },error =>{
        console.log(error);
      })
      this.existe= false;
    
  }else{
    //Editamos el vuelo 
    //this._usuarioService.updateUser(this.id,this.usuario).subscribe(data =>{
      /* const usuarioA: Usuario = {
        id: this.agregarusuario.get('id')?.value,
        usuario: this.agregarusuario.get('usuario')?.value,
        contraseña: this.agregarusuario.get('contraseña')?.value,
        rol:this.agregarusuario.get('rol')?.value,
        
      }
      if(usuarioA.contraseña==this.usuario.contraseña){
      if(this.usuario.rol=='admin'){
      this._router.navigate(['/vuelos']);
      console.log('Actualizo Admin');
     }
      else{
      this._router.navigate(['/vueloscliente']);
      console.log('Actualizo No Admin');
      }
    } */
    /* },error =>{
      console.log(error);
      
    }) */
    //this.toastr.error('El usuario ya existe', 'Error');
    console.log("Ya existe el user");
    //this._router.navigate(['/venta']);
    this._router.navigate(['/venta',this.id]);
    
      
  }
    

  }
}
