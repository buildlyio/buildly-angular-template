import { Component, Input, OnChanges } from '@angular/core';
import { classify } from '@angular-devkit/core/src/utils/strings';

@Component({
  selector: 'mg-nav-bar-admin',
  templateUrl: './nav-bar-admin.component.html',
  styleUrls: ['./nav-bar-admin.component.scss']
})
export class NavBarAdminComponent implements OnChanges {
  endpoints: any[];
  @Input() swaggerObj: any;
  @Input() hideMenu = false;

  constructor() {}

  ngOnChanges() {
    if (this.swaggerObj) {
      this.getEndpointsFromSwagger();
    }
  }

  /**
   * gets the list of the endpoints from swagger
   */
  getEndpointsFromSwagger() {
    this.endpoints = Object.keys(this.swaggerObj.paths).map(path => {
      const pathSegments = path.split('/'); // split the path to array of segments
      if (!pathSegments[2] || pathSegments[2].length === 0) {
        return pathSegments[1]; // take the first path segemnt if there is no second segment
      }
      if (pathSegments[2] && pathSegments[2].includes('{')) {
        return pathSegments[1]; // take the first path segemnt if the second segment is a url parameter
      } else {
        return pathSegments[2]; // else take the second path segemnt
      }
    }).filter((value, index, self) => {
      return self.indexOf(value) === index;
    }).map((endpoint: any) => {
      return {
        name: classify(endpoint),
        value: endpoint.toLowerCase(),
      };
    });
  }
}
