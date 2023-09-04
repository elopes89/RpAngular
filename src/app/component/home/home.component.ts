import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IPaciente } from 'IPaciente';
import { IVacina } from 'IVacina';
import { CoronaVacService } from 'src/app/service/corona-vac.service';
import { IDash } from '../dash/IDash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private formBuilder: FormBuilder, private router: Router, private cv: CoronaVacService) {
    this.cv.nomePagina = "Home";
    this.Buscar();

  }

  vacinasPac: Array<IVacina> = [];
  nomeBusca = '';
  pacientes: Array<IPaciente> = [];
  pac = 0;
  vac = 0;
  Buscar() {
    this.cv.getAll("paciente", this.pacientes).subscribe(pac => {
      this.pac = pac.length;
      this.pacientes = pac
    })

    this.cv.getAll("vacina", this.cv.vacinas).subscribe(vac => {
      this.vac = vac.length;
    })

  }

  Detalhes(id: number) {
    this.cv.idDetail = id;
    this.cv.boolEditar = true;
    this.cv.atvBotao = true;
    this.router.navigate([`/private/edit/${id}`])
  }

}
