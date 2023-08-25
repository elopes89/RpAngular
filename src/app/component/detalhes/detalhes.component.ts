import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IPaciente } from 'IPaciente';
import { IVacina } from 'IVacina';
import { CoronaVacService } from 'src/app/service/corona-vac.service';
import { navBarData } from '../menu/nav-data';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {
  pacientes: Array<IPaciente> = [];
  vacinasPac: Array<IVacina> = [];
  constructor(private formBuilder: FormBuilder, private router: Router,
    private cv: CoronaVacService) {
    this.cv.nomePagina = navBarData[2].label;
    this.BuscarPac();

  }

  iD = this.cv.idDetail;
  BuscarPac() {
    this.cv.getAll("paciente", this.pacientes).subscribe(pac => {
      this.pacientes = pac;
    });
    this.cv.getAll("vacina", this.vacinasPac).subscribe(vac => {
      this.vacinasPac = vac
    });
    this.iD = this.cv.idDetail;
    console.log(this.cv.idDetail);
  }
  ngOnInit(): void {
  }

}
