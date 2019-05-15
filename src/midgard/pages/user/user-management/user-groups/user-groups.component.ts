import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudDirective } from '@midgard/modules/crud/crud.directive';
import { getAllCoreGroups, getCoreGroupsLoaded } from '@midgard/state/coregroup/coregroup.selectors';

@Component({
  selector: 'user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.scss']
})
export class UserGroupsComponent implements OnInit {
  @ViewChild('crud') crud: CrudDirective;

  public dataSelector;
  public loadedSelector;
  public dropdownOptions = [
    {label: '•••', value: '•••'},
    {label: 'Delete', value: 'delete'}
  ];

  constructor() { }

  ngOnInit() {
    this.dataSelector = getAllCoreGroups;
    this.loadedSelector = getCoreGroupsLoaded;
  }

  /**
   * updates the permission of a group
   * @param value - the current value of the permision
   * @param permission - the permission to be updated
   * @param row - the current group
   */
  updatePermission(value: boolean, permission: string, row) {
    row.permissions[permission] = value;
    this.crud.updateItem(row);
  }

  /**
   * updates the name of a group
   * @param editedObj - an object with the edited element and its value
   * @param row - the current group
   */
  updateName(editedObj: {value: string, elementName: string}, row) {
    const {value} = editedObj;
    row.name = value;
    this.crud.updateItem(row);
  }
  /**
   * function that it is triggered to handle actions of the dropdown
   * @param action - the action that has been chosen
   * @param row - the row where the action is triggered
   */
  dropdownActionTriggered(row, action: string) {
    if (action === 'delete') {
      this.crud.deleteItem(row);
    }
  }

}
