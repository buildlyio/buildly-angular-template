import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../../midgard/modules/http/http.service';

@Component({
  selector: 'main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.scss']
})
export class MainAdminComponent implements OnInit {

  hideMenu: boolean;
  currentEndpoint: string;
  swaggerObj: any

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit() {
    this.getEndpointFromUrl();
    this.getSwaggerJson();
  }

  toggleMenu(menuToggle) {
    this.hideMenu = menuToggle;
  }

  /**
   * it sends a request to get swagger json
   */
  getSwaggerJson() {
    this.httpService.makeRequest('get', `${environment.API_URL}docs/swagger.json`).subscribe(res => {
      if (res.data) {
        this.swaggerObj = res.data;
      }
    });
  }

  /**
   * it gets the endpoint from the router params
   */
  getEndpointFromUrl() {
    this.activatedRoute.params.subscribe(params => {
      if (params) {
        this.currentEndpoint = params['endpoint'];
      }
    });
  }
}
