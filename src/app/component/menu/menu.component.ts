import { Component, OnInit } from '@angular/core';
import { navBarData } from './nav-data';
import { CoronaVacService } from 'src/app/service/corona-vac.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor(private cv: CoronaVacService, private route: Router) {
    this.Buscar();
  }
  navData = navBarData;
  ngOnInit(): void { }
  upDash() {
    this.cv.atualizarDash();
  }


  Buscar() {
    this.cv.getAll("paciente", this.cv.pacientes).subscribe(pac => {
      this.cv.pacientes = pac;
    })

    this.cv.getAll("vacina", this.cv.vacinas).subscribe(pac => {
      this.cv.vacinas = pac;
    })
  }


  collapsed = false;
  toogleCollapsed() {
    this.collapsed = !this.collapsed
  }
  closeSideNav() {
    this.collapsed = false
  }

  testfunc() {
    this.cv.sair();
    this.route.navigate(['/']);
  }


}
