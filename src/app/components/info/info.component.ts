import { Component } from '@angular/core';
import { environment } from 'environment';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  version: string = environment.version
}
