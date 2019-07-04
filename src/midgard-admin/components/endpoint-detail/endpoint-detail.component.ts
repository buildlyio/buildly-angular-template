import { Component, Input, OnChanges } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../../midgard/modules/http/http.service';
import { camelize, capitalize, classify } from '@angular-devkit/core/src/utils/strings';

@Component({
  selector: 'mg-endpoint-detail',
  templateUrl: './endpoint-detail.component.html',
  styleUrls: ['./endpoint-detail.component.scss']
})
export class EndpointDetailComponent implements OnChanges {

  @Input() endpoint: string;
  operations: any;

  rows = [
    {first_name: 'Michael', last_name: 'Jackson', address: 'Sunset Boulevard 2', phone: '33456321'},
    {first_name: 'James', last_name: 'Bond', address: 'Bond Street 7', phone: '0070071'},
    {first_name: 'Sherlock', last_name: 'Holmes', address: 'Bond Street 5', phone: '0070071'},
    {first_name: 'James', last_name: 'Bond', address: 'Bond Street 7', phone: '0070071'},
    {first_name: 'Sherlock', last_name: 'Holmes', address: 'Bond Street 5', phone: '0070071'},
    {first_name: 'Michael', last_name: 'Jackson', address: 'Sunset Boulevard 2', phone: '33456321'},
    {first_name: 'Sherlock', last_name: 'Holmes', address: 'Bond Street 5', phone: '0070071'},
    {first_name: 'Michael', last_name: 'Jackson', address: 'Sunset Boulevard 2', phone: '33456321'},
    {first_name: 'James', last_name: 'Bond', address: 'Bond Street 7', phone: '0070071'}
  ];
  tableOptions: any;

  constructor(
    private httpService: HttpService
  ) { }


  ngOnChanges() {
    this.getOperationsFromSwagger();
  }

  /**
   * gets the list of Http operations that can be applied to the endpoint from swagger
   */
  getOperationsFromSwagger() {
    const httpVerbs: any = ['get', 'put', 'post', 'delete', 'patch'];
    this.httpService.makeRequest('get', `${environment.API_URL}/docs/swagger.json`).subscribe(res => {
      if (res.data) {
        this.defineTableColumns(res.data);
        // get the available operations for the current endpoint
        this.operations = Object.entries(res.data.paths).filter(path => {
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
    if (swaggerRes.definitions) {
      const requiredFields = Object.entries(swaggerRes.definitions).find(definition => definition[0].toLowerCase() === this.endpoint);
      const columns = requiredFields[1].required.map(field => {
        return {name: capitalize(field), prop: field, flex: 1, sortable: true, filtering: true};
      })
      this.tableOptions = {
        columns: columns
      };
    }
  }
}
