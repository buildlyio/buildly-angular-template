import {
  Component, Input, OnChanges,
} from '@angular/core';

@Component({
  selector: 'mg-endpoint-main',
  templateUrl: './endpoint-main.component.html',
  styleUrls: ['./endpoint-main.component.scss']
})
export class EndpointMainComponent implements OnChanges {
  @Input() endpoint: string;
  @Input() swaggerObj: any;
  paths: any;
  definitions: any;
  crudInputs: {
    idProp?: string;
    dataProp?: string;
    endpoint?: string;
  };
  constructor() { }

  ngOnChanges() {
    if (this.swaggerObj) {
      this.getPathsFromSwagger();
      this.getDefinitionsFromSwagger();
    }
  }

  /**
   * gets the list of paths to do Http operations that can be applied to the endpoint from swagger
   */
  getPathsFromSwagger() {
    this.paths = null;
    this.crudInputs = {};
    const httpVerbs: any = ['get', 'put', 'post', 'delete', 'patch'];
    // get the available operations for the current endpoint
    this.paths = Object.entries(this.swaggerObj.paths).filter((path: any) => {
      const pathSegments = path[0].split('/'); // split the path url to segments
      if (!pathSegments[2] || pathSegments[2].length === 0) {
        return pathSegments[1].includes(this.endpoint); // take the first path segemnt if there is no second segment
      }
      if (pathSegments[2] && pathSegments[2].includes('{')) {
        return pathSegments[1].includes(this.endpoint); // take the first path segemnt if the second segment is a url parameter
      } else {
        return pathSegments[2].includes(this.endpoint); // else take the second path segemnt
      }
    }).map(path => {
      const httpMethods = Object.keys(path[1]).filter(verb => {
          return httpVerbs.includes(verb);
      });
      path.push(httpMethods);
      return path;
    });
    this.crudInputs.endpoint = this.paths[0][0];
  }

  /**
   * get endpoint definitions from swagger
   */
  getDefinitionsFromSwagger() {
    let definitionKey;
    // find the definition schema from the swagger paths object
    if (this.paths[0][1].get && this.paths[0][1].get.responses['200'].schema.items) { // without pagination
      definitionKey = this.paths[0][1].get.responses['200'].schema.items.$ref.split('/')[2];
      this.crudInputs.dataProp = 'data'; // push the data property to use in the crud module
    } else { // with pagination
      definitionKey = this.paths[0][1].get.responses['200'].schema.properties.results.items.$ref.split('/')[2];
      this.crudInputs.dataProp = 'results'; // push the data property to use in the crud module
    }
    this.definitions = this.swaggerObj.definitions[definitionKey];
  }
}
