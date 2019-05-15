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
   * updates the data of a group from inline editing
   */
  updateGroup() {

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
