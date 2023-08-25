import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IPaciente } from 'IPaciente';
import { IVacina } from 'IVacina';
import { CoronaVacService } from 'src/app/service/corona-vac.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private formBuilder: FormBuilder, private router: Router, private cv: CoronaVacService) {
    this.Buscar();
    this.cv.nomePagina = "Home";

  }

  vacinasPac: Array<IVacina> = [];
  nomeBusca = '';
  pacientes: Array<IPaciente> = [];
  Buscar() {
    this.cv.getAll("paciente", this.pacientes).subscribe((pac => {
      this.pacientes = pac;
    }));
    this.cv.getAll("vacina", this.vacinasPac).subscribe(vac => {
      this.vacinasPac = vac
    });
  }


  Detalhes(id: number) {
    this.cv.idDetail = id;
    this.cv.boolEditar = true;
    this.cv.atvBotao = true;
    this.router.navigate([`/private/edit/${id}`])
  }

}
