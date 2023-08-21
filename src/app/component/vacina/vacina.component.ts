import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPaciente } from 'IPaciente';
import { IVacina } from 'IVacina';
import { CoronaVacService } from 'src/app/service/corona-vac.service';

@Component({
  selector: 'app-vacina',
  templateUrl: './vacina.component.html',
  styleUrls: ['./vacina.component.css']
})
export class VacinaComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private router: Router, private cv: CoronaVacService) {
    this.BuscarPac();
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
      this.router.navigate(['/'])
    }
  }

  BuscarPac() {
    this.cv.getAllPac().subscribe(pac => {
      this.pacientes = pac;
    })
  }

  vacinas: Array<IVacina> = [];
  salvar() {
    this.cv.add(this.registerForm.value, this.vacinas, "vacina").subscribe((user => {
      this.vacinas.push(user);
    }))
  }
  tes = 10;
  getFormPac(id: number) {
    this.cv.getIdPac(id).subscribe(pac => {
      this.atendi = pac;
      console.log(this.atendi);
      console.log(this.atendi.id);
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
