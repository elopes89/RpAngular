import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { MenuComponent } from './component/menu/menu.component';
import { PacienteComponent } from './component/paciente/paciente.component';
import { HomeComponent } from './component/home/home.component';
import { UsuarioComponent } from './component/usuario/usuario.component';
import { VacinaComponent } from './component/vacina/vacina.component';
import { HistoricoComponent } from './component/historico/historico.component';
import { DetalhesComponent } from './component/detalhes/detalhes.component';
import { EditarComponent } from './component/editar/editar.component';
import { TesteComponent } from './component/teste/teste.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'home', component: HomeComponent },
  { path: 'paciente', component: PacienteComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'vacina', component: VacinaComponent },
  { path: 'historico', component: HistoricoComponent },
  { path: 'detalhes', component: DetalhesComponent },
  { path: 'edit/:id', component: EditarComponent },
  { path: 'teste', component: TesteComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ], exports: [RouterModule]
})
export class AppRoutingModule { }
