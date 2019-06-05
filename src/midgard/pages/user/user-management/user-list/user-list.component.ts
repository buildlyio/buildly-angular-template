import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { getAllCoreUsers, getCoreUsersLoaded } from '@midgard/state/coreuser/coreuser.selectors';
import { select, Store } from '@midgard/modules/store/store';
import { Router } from '@angular/router';
import { CrudDirective } from '@midgard/modules/crud/crud.directive';
import { getAllCoreGroups } from '@midgard/state/coregroup/coregroup.selectors';
import { loadCoregroupData } from '@midgard/state/coregroup/coregroup.actions';

@Component({
  selector: 'mg-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  @ViewChild('crud') crud: CrudDirective;

  public dataSelector;
  public loadedSelector;
  public coreGroups;
  private coreGroupsSubscription;

  constructor(
    private router: Router,
    private store: Store<any>
  ) {
  }

  ngOnInit() {
    this.dataSelector = getAllCoreUsers;
    this.loadedSelector = getCoreUsersLoaded;
    this.getCoreGroups();
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
    let updatedUser;
    if (action === 'delete') {
      this.crud.deleteItem(row);
    } else if (action === 'deactivate') {
      updatedUser = {
        id: row.id,
        is_active: false
      };
    } else if (action === 'activate') {
      updatedUser = {
        id: row.id,
        is_active: true
      };
    }
    this.crud.updateItem(updatedUser);
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
   * get the application core groups to show them in the table
   */
  getCoreGroups() {
    this.store.dispatch(loadCoregroupData());
    this.coreGroupsSubscription = this.store.observable.pipe(
      select(getAllCoreGroups),
    ).subscribe( (data: any[]) => {
      if (data) {
        this.coreGroups = data.map(coreGroup => {
          return {label: coreGroup.name, value: coreGroup.id};
        });
      }
    });
  }

  /**
   * updates the core group of the user
   * @param group - the selected group
   * @param row - the current user row
   */
  updateCoreGroup(group, row) {
    let updatedUser;
    if (row.id) {
      updatedUser = {
        id: row.id,
        core_groups: [group.value],
      };
    }
    this.crud.updateItem(updatedUser);
  }

  ngOnDestroy() {
    if (this.coreGroupsSubscription) {
      this.coreGroupsSubscription.unsubscribe();
    }
  }
}
