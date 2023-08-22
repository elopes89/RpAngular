import { Component, OnInit } from '@angular/core';
import { navBarData } from './nav-data';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  navData = navBarData;
  ngOnInit(): void {
  }

  collapsed = false;
  toogleCollapsed() {
    this.collapsed = !this.collapsed
  }
  closeSideNav() {
    this.collapsed = false
  }
}
