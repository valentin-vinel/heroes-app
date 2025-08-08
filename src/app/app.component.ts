import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HEROES } from './heroes/mock-heroes-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  heroList = HEROES;

  constructor() {}

  ngOnInit() {
    console.table(this.heroList);
  }

}
