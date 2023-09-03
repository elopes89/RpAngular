import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPaciente } from 'IPaciente';
import { CoronaVacService } from 'src/app/service/corona-vac.service';
import { navBarData } from '../menu/nav-data';
import { IEndereco } from 'src/IEndereco';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {
  atendi!: IPaciente;
 end!: IEndereco;
  constructor(private router: ActivatedRoute, private route: Router, private cv: CoronaVacService) {
  }

  BuscaCep() {
    this.cv.getCep(this.atendi.cep).subscribe((ceps => {
      this.end = ceps;
    }))
  }


  ngOnInit(): void {
    const id = Number(this.router.snapshot.paramMap.get("id"))
    this.cv.getId(id, "paciente", this.cv.pacientes).subscribe((item) => {
      this.atendi = item;
    });
    // this.BuscaCep();
  }
}
