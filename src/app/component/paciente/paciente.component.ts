import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPaciente } from 'IPaciente';
import { IEndereco } from 'src/IEndereco';
import { CoronaVacService } from 'src/app/service/corona-vac.service';
import { navBarData } from '../menu/nav-data';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  @Input() atendiData: IPaciente | null = null;


  constructor(private formBuilder: FormBuilder, private router: Router,
    private cv: CoronaVacService) {
    this.NP()
    this.BuscarPac();

  }
  boEdit = this.cv.boolEditar;
  disBotao = this.cv.atvBotao;
  cepForm = '';
  registerForm!: FormGroup;
  vs = false;
  submitted = false;
  pacientes: Array<IPaciente> = [];
  enderecos: Array<IEndereco> = [];
  end!: IEndereco;
  NP() {
    if (this.boEdit == false) {
      this.cv.nomePagina = navBarData[3].label;

    } else {
      this.cv.nomePagina = "Editar";
    }
  }
  OnSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return
    } else {
      this.salvar();
      this.router.navigate(['/'])
    }
  }
  salvar() {
    this.cv.add(this.registerForm.value, this.pacientes, "paciente").subscribe((user => {
      this.pacientes.push(user);
    }))
  }

  EditPac() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else
      this.cv.edit(this.registerForm.value, this.cv.idDetail).subscribe(pac => {
        this.cv.pacientes.push(pac);
      });
    this.cv.boolEditar = false;
  }
  EditarCep() {
    this.boEdit = false;
  }

  BuscarPac() {
    this.cv.getAll("paciente", this.pacientes).subscribe(pac => {
      this.cv.pacientes = pac;
    })
  }
  BuscaCep() {
    this.cv.getCep(this.cepForm).subscribe((ceps => {
      this.end = ceps
    }))
  }
  nd = 0;
  Deletar() {
    for (let i = 0; i < this.cv.vacinas.length; i++) {
      if (this.cv.vacinas[i].idPaciente == this.cv.idDetail) {
        this.nd = this.cv.vacinas[i].idPaciente;
      }
    }
    if (this.nd !== this.cv.idDetail) {
      this.cv.del(this.cv.idDetail).subscribe(pac => {
        this.cv.pacientes.push(pac);
      });
      this.cv.boolEditar = false;
      alert(`Paciente ${this.atendiData?.nome} deletado com sucesso`);
      this.router.navigate(['/home']);
    } else {
      alert("Vacina cadastrada não permitido a deleção");
    }
  }


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      id: [''],
      nome: [this.atendiData ? this.atendiData.nome : '', [Validators.required]],
      genero: [this.atendiData ? this.atendiData.genero : '', [Validators.required]],
      dataNascimento: [this.atendiData ? this.atendiData.dataNascimento : '', [Validators.required]],
      cep: [this.atendiData ? this.atendiData.cep : '', [Validators.required]],
      rua: [this.atendiData ? this.atendiData.rua : '', [Validators.required]],
      bairro: [this.atendiData ? this.atendiData.bairro : '', [Validators.required]]
    })

  }
}
