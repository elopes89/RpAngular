import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPaciente } from 'IPaciente';
import { CoronaVacService } from 'src/app/service/corona-vac.service';
import { navBarData } from '../menu/nav-data';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {
  atendi!: IPaciente;
  constructor(private router: ActivatedRoute, private route: Router, private cv: CoronaVacService) {
  }

  ngOnInit(): void {
    const id = Number(this.router.snapshot.paramMap.get("id"))
    this.cv.getIdPac(id).subscribe((item) => {
      this.atendi = item;
    });
  }

}
