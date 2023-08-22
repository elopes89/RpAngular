import { Component, OnInit } from '@angular/core';
import { CoronaVacService } from 'src/app/service/corona-vac.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  constructor(private cv: CoronaVacService) {

  }

  BuscarPac() {
    this.cv.getAll("paciente", this.cv.pacientes).subscribe((pac => {
      this.cv.pacientes = pac;
    }))
    console.log("teste" + this.cv.pacientes);
  }

  ngOnInit(): void {
  }

}
