import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IPaciente } from 'IPaciente';
import { CoronaVacService } from 'src/app/service/corona-vac.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent {
  constructor(private formBuilder: FormBuilder, private router: Router, private cv: CoronaVacService) {
    this.Buscar();
    this.cv.nomePagina = "Histórico";

  }
nomeBusca = '';
pacientes: Array<IPaciente> = [];
Buscar(){
  this.cv.getAll("paciente", this.pacientes).subscribe((pac =>{
      this.pacientes = pac;
  }))
}

Detalhes(id: number){
  this.cv.idDetail = id;
  this.router.navigate(['/private/detalhes'])
}


}
