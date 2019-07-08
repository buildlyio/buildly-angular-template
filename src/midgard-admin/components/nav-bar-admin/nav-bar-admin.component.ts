import { Component, Input, OnChanges } from '@angular/core';

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
    this.endpoints = Object.keys(this.swaggerObj.definitions).map((endpoint: any) => {
      // get the available paths for the current endpoint
      const paths = Object.entries(this.swaggerObj.paths).filter(path => {
        return path[0].includes(endpoint.toLowerCase());
      });
      return {
        name: endpoint,
        value: endpoint.toLowerCase(),
        paths: paths
      };
    }).filter(endpoint => endpoint.paths.length > 0); // show only endpoints that have paths
  }
}
