import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUsuario } from 'IUsuario';
import { CoronaVacService } from 'src/app/service/corona-vac.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {


  constructor(private formBuilder: FormBuilder, private router: Router, private cv: CoronaVacService) {

  }

  registerForm!: FormGroup;
  vs = false;
  submitted = false;
  isLogged = false;
  usuarios: Array<IUsuario> = []

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
    this.cv.add(this.registerForm.value, this.usuarios, "usuario").subscribe((user => {
      this.usuarios.push(user);
    }))
  }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      senha: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required]]
    })
  }


}
