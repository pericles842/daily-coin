import { Component, OnInit } from '@angular/core';
import { dateConvert } from './functions/date';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sessionDate: Date = new Date();

  ngOnInit(): void {
    localStorage.setItem('timeSession',dateConvert(this.sessionDate))
    
  }

}
