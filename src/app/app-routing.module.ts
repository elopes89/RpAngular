import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { MenuComponent } from './component/menu/menu.component';
import { HomeComponent } from './component/home/home.component';
import { UsuarioComponent } from './component/usuario/usuario.component';
import { VacinaComponent } from './component/vacina/vacina.component';
import { HistoricoComponent } from './component/historico/historico.component';
import { DetalhesComponent } from './component/detalhes/detalhes.component';
import { EditarComponent } from './component/editar/editar.component';
import { PublicComponent } from './component/layouts/public/public.component';
import { privadoGuard, publicoGuard } from './auth.guard';
import { PrivateComponent } from './component/layouts/private/private.component';
import { PacienteComponent } from './component/paciente/paciente.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { DashComponent } from './component/dash/dash.component';

const routes: Routes = [

  {
    path: '', component: PublicComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, canActivate: [publicoGuard] },
      { path: 'usuario', component: UsuarioComponent, canActivate: [publicoGuard] },
    ]
  },
  {
    path: 'private', component: PrivateComponent,
    children: [

      {
        path: 'menu', component: MenuComponent,
        canActivate: [privadoGuard]
      },
      {
        path: 'home', component: HomeComponent,
        canActivate: [privadoGuard]
      },
      {
        path: 'vacina', component: VacinaComponent,
        canActivate: [privadoGuard]
      }, {
        path: 'paciente', component: PacienteComponent,
        canActivate: [privadoGuard]
      },
      {
        path: 'historico', component: HistoricoComponent,
        canActivate: [privadoGuard]
      },
      {
        path: 'detalhes', component: DetalhesComponent,
        canActivate: [privadoGuard]
      },
      {
        path: 'edit/:id', component: EditarComponent,
        canActivate: [privadoGuard]
      }, {
        path: 'dash', component: DashComponent,
        canActivate: [privadoGuard]
      },

    ]
  },
  {path: '**', component: NotFoundComponent}

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ], exports: [RouterModule, CommonModule]
})
export class AppRoutingModule { }
