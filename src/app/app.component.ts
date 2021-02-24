import { Component } from '@angular/core';
import { ScanparamsService } from './services/scan-params.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public scanParams: ScanparamsService) { 
    this.scanParams.getParams();
   }
}
