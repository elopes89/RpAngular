import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { MenuComponent } from './component/menu/menu.component';
import { LoginComponent } from './component/login/login.component';
import { PacienteComponent } from './component/paciente/paciente.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioComponent } from './component/usuario/usuario.component';
import { ToolBarComponent } from './component/tool-bar/tool-bar.component';
import { VacinaComponent } from './component/vacina/vacina.component';
import { HistoricoComponent } from './component/historico/historico.component';
import { DetalhesComponent } from './component/detalhes/detalhes.component';
import { EditarComponent } from './component/editar/editar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TesteComponent } from './component/teste/teste.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    LoginComponent,
    PacienteComponent,
    UsuarioComponent,
    ToolBarComponent,
    VacinaComponent,
    HistoricoComponent,
    DetalhesComponent,
    EditarComponent,
    TesteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, RouterModule, ReactiveFormsModule,  HttpClientModule, FormsModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
