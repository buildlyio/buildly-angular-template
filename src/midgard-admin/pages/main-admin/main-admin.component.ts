import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.scss']
})
export class MainAdminComponent implements OnInit {

  hideMenu: boolean;
  currentEndpoint: string;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.getEndpointFromUrl();
  }

  toggleMenu(menuToggle) {
    this.hideMenu = menuToggle;
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
