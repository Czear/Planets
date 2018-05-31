import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlanetsServiceService} from '../shared/planets-service.service';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.scss']
})
export class PlanetDetailsComponent implements OnInit, OnDestroy {
  planet = {};
  routeSubscription;
  constructor(private route: ActivatedRoute,
              private planetsService: PlanetsServiceService,
              private router: Router) { }
  ngOnInit() {
      // Get particular planet data from the server
      this.routeSubscription = this.route.params.subscribe(
          (params) => {
              this.planetsService.GETrequest('https://swapi.co/api/planets/' + params['id'] + '/')
                  .subscribe((result: any) => {
                      this.planet = result; },
                      () => {
                            this.router.navigate(['not-found']);
                      });
          }
      );
      // Turn off navBar functionality, user does not needs to filter or set page sizes inside planet-details component
      this.planetsService.functionalityStatus.next(false);
  }
  ngOnDestroy () {
      // Turn on functionality if you are leaving planet-details component
      this.planetsService.functionalityStatus.next(true);
      this.routeSubscription.unsubscribe();
  }
}
