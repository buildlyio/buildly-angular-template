import {
  Component, EventEmitter, Input, OnChanges, Output,
  ViewChild
} from '@angular/core';
import { capitalize } from '@angular-devkit/core/src/utils/strings';
import { CrudDirective } from '@midgard/modules/crud/crud.directive';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mg-endpoint-entries',
  templateUrl: './endpoint-entries.component.html',
  styleUrls: ['./endpoint-entries.component.scss']
})
export class EndpointEntriesComponent implements OnChanges {

  @ViewChild('crud') crud: CrudDirective;
  /**
   * the title of the endpoint
   */
  @Input() endpointTitle: any;
  /**
   * current endpoint swagger Definitions
   */
  @Input() definitions: any;
  /**
   * current endpoint swagger paths
   */
  @Input() paths: any;
  /**
   * Inputs for the crud module
   */
  @Input() crudInputs: any;
  /**
   * event that is triggered when the data is loaded from the crud module
   * @type {EventEmitter<any>}
   */
  @Output() dataLoaded = new EventEmitter();

  tableOptions: any = {columns: []};
  filterValue: string;

  dropdownOptions = [
    {label: '•••', value: '•••'},
    {label: 'Delete', value: 'delete'}
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnChanges() {
    if (this.definitions) {
      this.defineTableColumns();
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

  /**
   * navigates to the form view of the selected item
   * @param item - the selected item from the table
   */
  navigateToForm(item?: any) {
    if (item) {
      this.router.navigate([item.id], {relativeTo: this.activatedRoute});
    } else {
      this.router.navigate(['new'], {relativeTo: this.activatedRoute});
    }
  }

  /**
   * it emits an outputevent that the data is loaded from the crud module
   * @param {any[]} rows
   */
  onDataLoaded(rows: any[]) {
    this.dataLoaded.emit(rows);
  }

}
