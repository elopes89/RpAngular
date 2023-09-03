import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { MenuComponent } from './component/menu/menu.component';
import { LoginComponent } from './component/login/login.component';
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
import { PublicComponent } from './component/layouts/public/public.component';
import { PrivateComponent } from './component/layouts/private/private.component';
import { PacienteComponent } from './component/paciente/paciente.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { DashComponent } from './component/dash/dash.component';

import { NgChartsModule } from 'ng2-charts';
import { ChartModule } from 'angular-highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import {provideNgxMask, NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    LoginComponent,
    UsuarioComponent,
    ToolBarComponent,
    VacinaComponent,
    HistoricoComponent,
    DetalhesComponent,
    EditarComponent,
    PublicComponent,
    PrivateComponent,
    PacienteComponent,
    NotFoundComponent,
    DashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, RouterModule, ReactiveFormsModule,  HttpClientModule,
     FormsModule, MatToolbarModule, MatButtonModule, MatSidenavModule,
      MatIconModule, MatListModule, ChartModule, NgChartsModule, HighchartsChartModule, NgxMaskDirective, NgxMaskPipe
  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
