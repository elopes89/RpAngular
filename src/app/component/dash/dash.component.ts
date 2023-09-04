import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Chart, registerables } from 'node_modules/chart.js';
import { CoronaVacService } from 'src/app/service/corona-vac.service';
import { IDash } from './IDash';
Chart.register(...registerables)



@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  constructor(private cv: CoronaVacService, private formBuilder: FormBuilder) {

  }

  registerForm!: FormGroup;
  realData: any[] = [];
  chartData: any;
  dash: Array<IDash> = []

  ngOnInit() {
    this.cv.getDash().subscribe(pac => {
      this.chartData = pac
      if (this.chartData != null) {
        for (let i = 0; i < this.chartData.length; i++) {
          this.realData.push(this.chartData[i].paciente);
          this.realData.push(this.chartData[i].vacina);
        }
        console.log(this.realData)
      }

      this.RenderChart(this.realData);
    })


  }
  RenderChart(real: any) {
    new Chart("pie", {
      type: 'bar',
      data: {
        labels: ['Pacientes', 'Vacinas'],
        datasets: [{
          label: 'My First Dataset',
          data: real,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }




}
