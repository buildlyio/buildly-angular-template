import {
  Component, Input, OnChanges,
  ViewChild
} from '@angular/core';
import { capitalize } from '@angular-devkit/core/src/utils/strings';
import { CrudDirective } from '@midgard/modules/crud/crud.directive';

@Component({
  selector: 'mg-endpoint-entries',
  templateUrl: './endpoint-entries.component.html',
  styleUrls: ['./endpoint-entries.component.scss']
})
export class EndpointEntriesComponent implements OnChanges {

  @ViewChild('crud') crud: CrudDirective;
  /**
   * current endpoint swagger Definitions
   */
  @Input() definitions: any;
  /**
   * current endpoint swagger paths
   */
  @Input() paths: any;

  tableOptions: any = {columns: []};
  filterValue: string;
  crudInputs: {
    idProp?: string;
    dataProp?: string;
    endpoint?: string;
  };
  dropdownOptions = [
    {label: '•••', value: '•••'},
    {label: 'Delete', value: 'delete'}
  ];

  constructor() { }

  ngOnChanges() {
    if (this.definitions) {
      this.defineTableColumns();
      this.defineCrudInputs();
    }
  }

  /**
   * defines table column for the endpoint for the required fields
   */
  defineTableColumns() {
    let columns;
    let requiredColumns;
    // add first 2 properties to the table columns
    const propertiesColums = Object.keys(this.definitions.properties).slice(0, 2).map(field => {
      return {name: capitalize(field), prop: field, flex: 2, sortable: true};
    });
    // add required fields to the columns array
    if (this.definitions.required) {
      requiredColumns = this.definitions.required.map(field => {
        return {name: capitalize(field), prop: field, flex: 2, sortable: true};
      });
      columns = [...propertiesColums, ...requiredColumns].filter((value, index, self) => {
        return self.indexOf(value) === index;
      }); // get unique columns
    } else {
      columns = propertiesColums;
    }
    this.tableOptions = {
      columns: columns
    };
  }

  defineCrudInputs() {
    this.crudInputs = {};
    if (this.paths[0][0]) {
      this.crudInputs.endpoint = this.paths[0][0];
    }
    if (this.paths[0][1].get && this.paths[0][1].get.responses['200'].schema.items) { // without pagination
      this.crudInputs.dataProp = 'data'; // push the data property to use in the crud module
    } else { // with pagination
      this.crudInputs.dataProp = 'results'; // push the data property to use in the crud module
    }
  }

  /**
   * sets the table filter value
   */
  setFilterValue(value: string) {
    this.filterValue = value;
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
