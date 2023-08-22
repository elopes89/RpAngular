import { Component } from '@angular/core';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.css']
})
export class TesteComponent {
  constructor() { }
  nomeBotao = 'show'

  collapsed = false;
  toogleCollapsed() {
    this.collapsed = !this.collapsed;
    if(this.collapsed){
      this.nomeBotao = 'hide'
    }else{
      this.nomeBotao = 'show'
    }
  }
  closeSideNav() {
    this.collapsed = false
  }

}
