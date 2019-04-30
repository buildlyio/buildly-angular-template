import { Component, OnInit } from '@angular/core';
import { getAllCoreUsers } from '@src/midgard/state/coreuser/coreuser.selectors';
import {updateCoreUser} from '../../../state/coreuser/coreuser.actions';
import {Store} from '../../../modules/store/store';
import { getCoreUsersLoaded } from '../../../state/coreuser/coreuser.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'mg-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public tableOptions;
  public dataSelector;
  public loadedSelector;
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
  ) {
  }

  ngOnInit() {
    this.dataSelector = getAllCoreUsers;
    this.loadedSelector = getCoreUsersLoaded;
  }

  /**
   * function to activate the user or deactivate if he doesn't exist
   * @param selectedUser - selected user from the table
   */
  toggleUserActivation(selectedUser) {
    if (selectedUser.item.is_active) {
      selectedUser.item.is_active = false;
    } else {
      selectedUser.item.is_active = true;
    }
    this.store.dispatch(updateCoreUser(selectedUser.item));
  }

  /**
   * navigates to the detail page of the selected user
   * @param {object} row - the current row
   */
  goToDetailsPage(row) {
    if (!row) {
      this.router.navigate([`/user/details/new`]);
    } else {
      this.router.navigate([`/user/details/${row.id}/`]);
    }
  }
}
