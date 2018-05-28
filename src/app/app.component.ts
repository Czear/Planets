import { Component } from '@angular/core';
import { PlanetsServiceService } from './shared/planets-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PlanetsServiceService]
})
export class AppComponent {}
