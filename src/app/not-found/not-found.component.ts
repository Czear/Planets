import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlanetsServiceService} from '../shared/planets-service.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit, OnDestroy {
  constructor(private planetsService: PlanetsServiceService) {}
    ngOnInit() {
        this.planetsService.functionalityStatus.next(false);
    }
    ngOnDestroy () {
        this.planetsService.functionalityStatus.next(true);
    }
}
