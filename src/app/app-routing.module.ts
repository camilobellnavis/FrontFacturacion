import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVentasComponent } from './components/list-ventas/list-ventas.component';
import { VentaComponent } from './components/venta/venta.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { FormsModule } from '@angular/forms';
import { DetalleComponent } from './components/detalle/detalle.component';

const routes: Routes = [
  {path:'', component: PrincipalComponent},
  {path:'ventas', component: ListVentasComponent},
  {path:'venta/:id', component: VentaComponent},
  {path:'cliente', component: ClienteComponent},
  {path:'detalle/:id', component: DetalleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
