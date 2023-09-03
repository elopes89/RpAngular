import { Component, OnInit } from '@angular/core';
import { CoronaVacService } from 'src/app/service/corona-vac.service';
import { navBarData } from 'src/app/component/menu/nav-data';
import { Router } from '@angular/router';
import { IUsuario } from 'IUsuario';


@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {
  constructor(private cv: CoronaVacService, private route: Router) {
    this.pagina = this.cv.nomePagina;
    this.BuscarPac()

  }
  pagina = '';
  nomeFunca = ''
  usuario!: IUsuario;
  BuscarPac() {
    this.cv.getAll("paciente", this.cv.pacientes).subscribe((pac => {
      this.cv.pacientes = pac;
    }))
    this.cv.getId(0, "usuario", this.usuario).subscribe((user => {
      this.usuario = user;
      this.nomeFunca = user.nome;
    }))
  }
  logOut() {
    this.cv.sair();
    this.route.navigate(['/']);
  }

  ngOnInit(): void {
  }

}
