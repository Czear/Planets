import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlanetsServiceService} from '../shared/planets-service.service';

@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrls: ['./planets-list.component.scss']
})
export class PlanetsListComponent implements OnInit, OnDestroy {
    constructor(private planetsService: PlanetsServiceService) {}
    planets = []; // this array data will be displayed
    dataSubscription;
    functionalitySubscription;
    tableBuildingInProgress = true;
    ngOnInit() {
           this.dataSubscription = this.planetsService.planetsDataOutput.subscribe(
                (planetsArray: any) => {
                    this.planets = planetsArray;
                }
            );
            this.functionalitySubscription = this.planetsService.functionalityStatus.subscribe(
                (planetsArray: boolean) => {
                    this.tableBuildingInProgress = planetsArray;
                }
            );
                // If allPlanets data is empty, get it form server
                    if (!this.planetsService.allPlanets.length) {
                        this.getData();
                    } else {
                        // Force data flow in case of user backs form planet detail component
                        this.planetsService.filtredPlanetsOutput.next(this.planetsService.allPlanets);
                    }
        }
        ngOnDestroy() {
            this.dataSubscription.unsubscribe();
            this.functionalitySubscription.unsubscribe();
        }
    // Particular API data collector
    getData(link = 'https://swapi.co/api/planets/') {
      this.planetsService.functionalityStatus.next(false);
        this.planetsService.GETrequest(link).subscribe(
            (response: any) => {
                if (response.next) {
                    Array.prototype.push.apply(this.planetsService.allPlanets, response.results);
                    this.getData(response.next);
                } else {
                    this.planetsService.filtredPlanetsOutput.next(this.planetsService.allPlanets);
                    this.planetsService.functionalityStatus.next(true);
                }
            });
    }
}