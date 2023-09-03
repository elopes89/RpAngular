import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPaciente } from 'IPaciente';
import { IVacina } from 'IVacina';
import { CoronaVacService } from 'src/app/service/corona-vac.service';
import { navBarData } from '../menu/nav-data';

@Component({
  selector: 'app-vacina',
  templateUrl: './vacina.component.html',
  styleUrls: ['./vacina.component.css']
})
export class VacinaComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private router: Router, private cv: CoronaVacService) {
    this.BuscarPac();
    this.cv.BuscarDash();
    this.cv.nomePagina = navBarData[2].label;

  }
  nomeBusca = '';
  pacientes: Array<IPaciente> = [];
  pacientesId: Array<IPaciente> = [];
  registerForm!: FormGroup;
  submitted = false;
  atendi!: IPaciente;
  testeIdPac = 0;
  OnSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return
    } else {
      this.tes = this.cv.idVacina;
      this.salvar();
      this.cv.atualizarDash();
      this.router.navigate(['/'])
    }
  }

  BuscarPac() {
    this.cv.getAll("paciente", this.cv.pacientes).subscribe(pac => {
      this.pacientes = pac;
    });
    this.cv.getAll("vacina", this.cv.vacinas).subscribe(pac => {
      this.cv.vacinas = pac;
    });
  }

  vacinas: Array<IVacina> = [];
  salvar() {
    this.cv.add(this.registerForm.value, this.vacinas, "vacina").subscribe((user => {
      this.vacinas.push(user);
    }))
  }
  tes = 10;
  getFormPac(id: number) {
    this.cv.getId(id, "paciente", this.pacientes).subscribe(pac => {
      this.atendi = pac;
      this.nomeBusca = '';
    })
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      lab: ['', [Validators.required]],
      qtd: ['', [Validators.required]],
      idPaciente: ['', [Validators.required]]
    })
  }

}
