import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPaciente } from 'IPaciente';
import { IUsuario } from 'IUsuario';
import { CoronaVacService } from 'src/app/service/corona-vac.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarios: Array<IUsuario> = []
  pacientes: Array<IPaciente> = [];
  constructor(private formBuilder: FormBuilder, private router: Router, private cv: CoronaVacService) {
this.buscar();
this.cv.nomePagina = '';
  }
  registerForm!: FormGroup;
  vs = false;
  submitted = false;
  isLogged = false;

  async OnSubmit() {
    this.submitted = true;
    try {
      const usuario = {
        email: this.registerForm.get('email')?.value,
        senha: this.registerForm.get('senha')?.value
      };
      await this.cv.logar(usuario);
      this.cv.nomePagina = 'Home';
      this.router.navigate(['/private/home']);
    } catch (e) {
      this.vs = true;
    }

  }


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      senha: ['22', [Validators.required, Validators.minLength(1)]],
      email: ['22', [Validators.required]]
    })
  }

buscar(){
  this.cv.getAll("usuario", this.usuarios).subscribe((user => {
    this.usuarios = user;
    console.log(this.usuarios)
  }))
}

  get email() {
    return this.registerForm.get('email')!;
  }

  get senha() {
    return this.registerForm.get('senha')!;
  }

}
