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
  registerForm!: FormGroup;
  vs = false;
  submitted = false;
  pacientes: Array<IPaciente> = [];
  enderecos: Array<IEndereco> = [];
  end!: IEndereco;
  NP() {
    if (this.boEdit == false) {
      this.cv.nomePagina = "Pacientes";
      this.cv.atvBotao = true;
    } else if(this.boEdit == true) {
      this.cv.nomePagina = "Editar";
      this.cv.atvBotao = false;
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
      this.upDash()
    }))
  }

  upDash() {
    this.cv.atualizarDash();
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
    this.router.navigate(['/private/home']);
  }

  BuscarPac() {
    this.cv.getAll("paciente", this.pacientes).subscribe(pac => {
      this.cv.pacientes = pac;
      this.cv.getAll("vacina", this.cv.vacinas).subscribe(pac => {
        this.cv.vacinas = pac;
      })
    })
  }
  cepBool = false;
  BuscaCep() {
    this.cv.getCep(this.registerForm.get('cep')?.value).subscribe((ceps => {
      this.end = ceps;
      this.cepBool = true;
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
      this.router.navigate(['/private/home']);
    } else {
      alert("Vacina cadastrada não permitido a deleção");
    }
  }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      id: [''],
      nome: [this.atendiData ? this.atendiData.nome : '', [Validators.required]],
      cpf: [this.atendiData ? this.atendiData.cpf : '', [Validators.required]],
      rg: [this.atendiData ? this.atendiData.rg : '', [Validators.required]],
      contato: [this.atendiData ? this.atendiData.contato : ''],
      alergias: [this.atendiData ? this.atendiData.rg : ''],
      email: [this.atendiData ? this.atendiData.email : '', [Validators.email]],
      estado: [this.atendiData ? this.atendiData.estado : '', [Validators.required]],
      telefone: [this.atendiData ? this.atendiData.telefone : '', [Validators.required]],
      genero: [this.atendiData ? this.atendiData.genero : '', [Validators.required]],
      dataNascimento: [this.atendiData ? this.atendiData.dataNascimento : '', [Validators.required]],
      cep: [this.atendiData ? this.atendiData.cep : '', [Validators.required]],
      rua: [this.atendiData ? this.atendiData.rua : '', [Validators.required]],
      bairro: [this.atendiData ? this.atendiData.bairro : '', [Validators.required]],
      uf: [this.atendiData ? this.atendiData.uf : '', [Validators.required]]

    })
  }
  get cep() {
    return this.registerForm.get('cep');
  }

  get bairro() {
    return this.registerForm.get('bairro')!
  }

  get rua() {
    return this.registerForm.get('rua')!
  }

}
