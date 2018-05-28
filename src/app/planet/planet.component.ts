import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent {
@Input() planetData;

  getPlanetUrlID () {
    const url = this.planetData.url.split('/');
    return url[5];
  }
}
