import { Component, OnInit, ViewChild } from '@angular/core';
import { getAllCoreUsers, getCoreUsersLoaded } from '@src/midgard/state/coreuser/coreuser.selectors';
import {Store} from '../../../modules/store/store';
import { Router } from '@angular/router';
import { CrudDirective } from '../../../modules/crud/crud.directive';

@Component({
  selector: 'mg-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild('crud') crud: CrudDirective;

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
   * defines the dropdown options for each row
   */
  defineDropdownOptions() {
    if (this.crud.rows) {
      this.crud.rows.forEach( row => {
        if (row.is_active) {
          row.dropdownOptions = [
            {label: '•••', value: '•••'},
            {label: 'Change Password', value: 'changePassword'},
            {label: 'Deactivate', value: 'deactivate'},
            {label: 'Delete', value: 'delete'}];
        } else {
          row.dropdownOptions = [
            {label: '•••', value: '•••'},
            {label: 'Change Password', value: 'changePassword'},
            {label: 'Activate', value: 'activate'},
            {label: 'Delete', value: 'delete'}];
        }
      });
    }
  }

  /**
   * function that it is triggered to handle actions of the dropdown
   * @param action - the action that has been chosen
   * @param row - the row where the action is triggered
   */
  dropdownActionTriggered(row, action: string) {
    if (action === 'delete') {
      this.crud.deleteItem(row);
    } else if (action === 'deactivate') {
      row.is_active = false;
      this.crud.updateItem(row);
    } else if (action === 'activate') {
      row.is_active = true;
      this.crud.updateItem(row);
    }
  }

  /**
   * a function calls the crud module to update a user when a field is edited
   * @param editedObj - an object with the edited element and its value
   * @param row - the current user row
   */
  updateUser(editedObj: {value: string, elementName: string}, row) {
    const {value, elementName} = editedObj;
    if (elementName === 'name') {
      this.updateName(value, row);
    } else {
      let updatedUser;
      if (row.id) {
        updatedUser = {
          id: row.id
        };
        updatedUser[elementName] = value;
      }
      this.crud.updateItem(updatedUser);
    }

  }

  /**
   * splits the full name to first_name and last name and updates the user
   * @param row - the current user row
   */
  updateName(fullname: string, row) {
    let updatedUser;
    const firstName = fullname.split(' ')[0];
    const lastName = fullname.split(' ')[1];
    if (row.id) {
      updatedUser = {
        id: row.id,
        first_name: firstName,
        last_name: lastName
      };
    }
    this.crud.updateItem(updatedUser);
  }

  /**
   * navigates to the invite user page
   */
  goToInviteUser() {
    this.router.navigate([`/user/invite`]);
  }
}
