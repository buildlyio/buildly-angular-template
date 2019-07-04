import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@src/midgard/modules/store/store';
import { getAuthUser } from '@src/midgard/state/authuser/authuser.selectors';
import { HttpService } from '@midgard/modules/http/http.service';
import { environment } from '@env/environment';

@Component({
  selector: 'mg-nav-bar-admin',
  templateUrl: './nav-bar-admin.component.html',
  styleUrls: ['./nav-bar-admin.component.scss']
})
export class NavBarAdminComponent implements OnInit {
  endpoints: any[];
  @Input() hideMenu = false;

  constructor(
    private httpService: HttpService
  ) {}

  ngOnInit() {
    this.getEndpointsFromSwagger();
  }

  /**
   * gets the list of the endpoints from swaggerrr
   */
  getEndpointsFromSwagger() {
    this.httpService.makeRequest('get', `${environment.API_URL}/docs/swagger.json`).subscribe(res => {
      console.log(res.data);
      if (res.data.definitions) {
        this.endpoints = Object.keys(res.data.definitions).map(endpoint => {
          return {
            name: endpoint,
            value: endpoint.toLowerCase()
          };
        });
      }
    });
  }

}
