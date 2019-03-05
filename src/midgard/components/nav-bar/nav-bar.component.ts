import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@src/midgard/modules/store/store';
import { getAuthUser } from '@src/midgard/state/authuser/authuser.selectors';
import { Observable } from 'rxjs';
import {selectTopBarOption} from '../../state/top-bar/top-bar.actions';

@Component({
  selector: 'mg-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() hideMenu = false;
  public currentUser: Observable<any>;
  public topBarOptions = [
    {
      label: 'Profile',
      value: 'user-profile'
    },
    {
      label: 'User Management',
      value: 'user-management'
    }
  ];

  constructor(
    private store: Store<any>,
  ) { }

  ngOnInit() {
    this.currentUser = this.store.observable.pipe(select(getAuthUser));
  }

  setTopBarOptions() {
    this.store.dispatch(selectTopBarOption({value: 'user-profile', index: 0}));
  }
}
