import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@libs/midgard-angular/src/lib/modules/store/store';
import { getAuthUser } from '@libs/midgard-angular/src/lib/state/authuser/authuser.selectors';
import { Observable } from 'rxjs';
import {selectTopBarOption, setTopBarOptions} from '../../state/top-bar/top-bar.actions';
import {Router} from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit() {
    this.currentUser = this.store.observable.pipe(select(getAuthUser));
  }

  goToAdmin() {
    this.router.navigate(['/user']);
    this.store.dispatch(selectTopBarOption({value: 'user-profile', index: 0}));
  }
}
