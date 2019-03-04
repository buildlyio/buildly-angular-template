import { Component, OnInit } from '@angular/core';
import { getAllCoreUsers } from '@libs/midgard-angular/src/lib/state/coreuser/coreuser.selectors';
import {updateCoreUser} from '../../../state/coreuser/coreuser.actions';
import {Store} from '../../../modules/store/store';
import {selectTopBarOption, setTopBarOptions} from '../../../state/top-bar/top-bar.actions';

@Component({
  selector: 'mg-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public tableOptions;
  public selector;
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
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.selector = getAllCoreUsers;
    this.defineTableOptions();
  }

  private defineTableOptions() {
    this.tableOptions = {
      columns: [
        {name: 'Username', prop: 'username', flex: 2, sortable: true, filtering: true},
        {name: 'Name', prop: 'fullName', flex: 2, sortable: true, filtering: true},
        {name: 'Email', prop: 'email', flex: 2, sortable: true, filtering: false},
        {name: 'Active', cellTemplate: 'activate', prop: 'is_active', flex: 2, sortable: true, filtering: false},
      ]
    };
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
}
