import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PlanetsServiceService {
  constructor(private httpClient: HttpClient) {}
    planetsDataOutput = new Subject(); // Sends data that is ready to display
    functionalityStatus = new Subject(); // Sets status of navBar functionality
    filtredPlanetsOutput = new Subject(); // Sends filtered planet data for pagination component, so it can slice it for smaller pages
    pageSize = 5; // This variable needs to be shaded because navBar and pagination needs to know it information
    allPlanets = [];
      GETrequest(link) {
          return this.httpClient.get(link);
        }
}
