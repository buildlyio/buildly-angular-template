import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../../midgard/modules/http/http.service';

@Component({
  selector: 'mg-endpoint-detail',
  templateUrl: './endpoint-detail.component.html',
  styleUrls: ['./endpoint-detail.component.scss']
})
export class EndpointDetailComponent implements OnChanges {

  @Input() endpoint: string;
  operations: any;

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
    this.httpService.makeRequest('get', `${environment.API_URL}/docs/swagger.json`).subscribe(res => {
      if (res.data) {
        // get the available operations for the current endpoint
        this.operations = Object.entries(res.data.paths).filter(path => {
          return path[0].includes(this.endpoint);
        });

        console.log(this.operations);
      }
    });
  }

}
