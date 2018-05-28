import { Component, OnInit } from '@angular/core';
import {PlanetsServiceService} from '../shared/planets-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private planetsService: PlanetsServiceService) { }
  filterString = '';
  pageSizes = [5, 10, 25, 100]; // page sizes are arrayed because of it needs few individual arguments so *ngFor can do it easy
  functionalityStatus = false;
  currentPageSize = this.planetsService.pageSize;
      ngOnInit() {
          this.planetsService.functionalityStatus.subscribe(
              (newStatus: boolean) => {
                  this.functionalityStatus = newStatus;
                      if (!newStatus) {
                          this.filterString = '';
                      }
              }
          );
      }
        setPageSize(selectedPageSize) {
            if (selectedPageSize !== undefined) {
                this.currentPageSize = this.planetsService.pageSize = selectedPageSize;
                this.filterPlanets(); // Rebuild planets-table if page size was changed
            }
        }
        filterPlanets() {
            const filtredPlanets = [];
            this.planetsService.allPlanets.forEach((item) => {
                if (item.name.toUpperCase().includes(this.filterString.toUpperCase())) {
                    filtredPlanets.push(item);
                }
            });
            this.planetsService.filtredPlanetsOutput.next(filtredPlanets);
        }
}
