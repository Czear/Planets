import {Component, OnInit} from '@angular/core';
import {PlanetsServiceService} from '../shared/planets-service.service';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  constructor(private planetsService: PlanetsServiceService) { }
    filtredPlanets = []; // Data that will be sliced to smaller data amounts for purpose of pagination
    currentPage = 0; // Needed only for styling purpose
    functionalityStatus = true;
      ngOnInit() {
          this.planetsService.functionalityStatus.subscribe(
              (newStatus: boolean) => this.functionalityStatus = newStatus);
       // Force data flow in case of user backs form planet detail component
       this.filtredPlanets = this.planetsService.allPlanets;
           this.planetsService.filtredPlanetsOutput.subscribe(
                (filtredPlanetsInput: any) => {
                  this.filtredPlanets = filtredPlanetsInput;
                    this.setPage(0); // With every data change user will be referred to first slice of data
                }
            );
      }
    setPage(pageNum) {
          if (pageNum >= 0) {
              this.currentPage = pageNum;
              const planetsDataSlice = this.getSliceOfFilteredArray ();
              this.planetsService.planetsDataOutput.next(planetsDataSlice);
          }
     }
        getNumberOfPages() {
          // Planets amount / page Size = number of sites, also quotient needs to be always rounded up
            const numberOfSites = Math.ceil(this.filtredPlanets.length / this.planetsService.pageSize);
                // Prevents one-piece pagination, then creates an array of pages numbers so *ngFor can handle it
                if (numberOfSites > 1) {
                    return Array(numberOfSites).fill(1).map((x, i) => i);
                }
        }
        getSliceOfFilteredArray () {
             return this.filtredPlanets.slice(this.currentPage * this.planetsService.pageSize, (this.currentPage + 1) * this.planetsService.pageSize);
        }
}
