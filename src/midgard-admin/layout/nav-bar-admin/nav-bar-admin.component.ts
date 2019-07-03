import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@src/midgard/modules/store/store';
import { getAuthUser } from '@src/midgard/state/authuser/authuser.selectors';

@Component({
  selector: 'mg-nav-bar-admin',
  templateUrl: './nav-bar-admin.component.html',
  styleUrls: ['./nav-bar-admin.component.scss']
})
export class NavBarAdminComponent implements OnInit {

  @Input() hideMenu = false;
  constructor(
  ) {}

  ngOnInit() {
  }

}
