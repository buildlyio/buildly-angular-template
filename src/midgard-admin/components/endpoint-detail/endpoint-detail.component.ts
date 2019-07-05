import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../../midgard/modules/http/http.service';
import { capitalize } from '@angular-devkit/core/src/utils/strings';
import { CrudDirective } from '../../../midgard/modules/crud/crud.directive';

@Component({
  selector: 'mg-endpoint-detail',
  templateUrl: './endpoint-detail.component.html',
  styleUrls: ['./endpoint-detail.component.scss']
})
export class EndpointDetailComponent implements OnChanges {
  @ViewChild('crud') crud: CrudDirective;
  @Input() endpoint: string;
  paths: any;
  definitions: any;
  tableOptions: any;
  filterValue: string;
  showDefinitions = false;
  dropdownOptions = [
    {label: '•••', value: '•••'},
    {label: 'Delete', value: 'delete'}
  ];

  constructor(
    private httpService: HttpService
  ) { }


  ngOnChanges() {
    this.getOperationsFromSwagger();
  }

  /**
   * gets the list of paths to do Http operations that can be applied to the endpoint from swagger
   */
  getOperationsFromSwagger() {
    this.paths = null;
    const httpVerbs: any = ['get', 'put', 'post', 'delete', 'patch'];
    this.httpService.makeRequest('get', `${environment.API_URL}docs/swagger.json`).subscribe(res => {
      if (res.data) {
        this.defineTableColumns(res.data);
        this.getDefinitionsFromSwagger(res.data);
        // get the available operations for the current endpoint
        this.paths = Object.entries(res.data.paths).filter(path => {
          return path[0].includes(this.endpoint);
        }).map(path => {
          path[1] = Object.keys(path[1]).filter(verb => {
            return httpVerbs.includes(verb);
          });
          return path;
        });
      }
    });
  }

  /**
   * get endpoint definitions from swagger
   * @param swaggerResponse - the response from swagger
   */
  getDefinitionsFromSwagger(swaggerRes) {
    const definitionKey = Object.keys(swaggerRes.definitions).find(key => key.toLowerCase() === this.endpoint)
    this.definitions = JSON.stringify(swaggerRes.definitions[definitionKey], null, 2);
  }

  /**
   * copies selected endpoint to clipboard
   * @param val - value to be copied
   */
  copyEndpoint(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  /**
   * defines table column for the endpoint for the required fields
   * @param swaggerResponse - the response from swagger
   */
  defineTableColumns(swaggerRes) {
    let columns;
    let requiredColumns
    if (swaggerRes.definitions) {
      const definitions: any = Object.entries(swaggerRes.definitions).find(definition => definition[0].toLowerCase() === this.endpoint);
      // add first 2 properties to the table columns
      const propertiesColums = Object.keys(definitions[1].properties).slice(0, 2).map(field => {
        return {name: capitalize(field), prop: field, flex: 2, sortable: true, filtering: true};
      });
      // add required fields to the columns array
      if (definitions[1].required) {
        requiredColumns = definitions[1].required.map(field => {
          return {name: capitalize(field), prop: field, flex: 2, sortable: true, filtering: true};
        });
        columns = [...propertiesColums, ...requiredColumns].filter((value, index, self) => {
          return self.indexOf(value) === index;
        }); // get unique columns
      } else {
        columns = propertiesColums;
      }
      this.tableOptions = {
        columns: columns
      };
    }
  }

  /**
   * sets the table filter value
   */
  setFilterValue(value: string) {
    this.filterValue = value;
  }

  /**
   * function that it is triggered to handle actions of the dropdown
   * @param action - the action that has been chosen
   * @param row - the row where the action is triggered
   */
  dropdownActionTriggered(row, action: string) {
    if (action === 'delete') {
      this.crud.deleteItem(row);
    }
  }
}
