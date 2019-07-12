import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { CrudDirective } from '../../../midgard/modules/crud/crud.directive';

@Component({
  selector: 'mg-endpoint-form',
  templateUrl: './endpoint-form.component.html',
  styleUrls: ['./endpoint-form.component.scss']
})
export class EndpointFormComponent implements OnChanges {
  @ViewChild('crud') crud: CrudDirective;

  formFields: any;
  /**
   * Inputs for the crud module
   */
  @Input() crudInputs: any;
  /**
   * current endpoint swagger Definitions
   */
  @Input() definitions: any;
  /**
   * Id of the current selected item
   */
  @Input() currentItemId: string;
  /**
   * the title of the endpoint
   */
  @Input() endpointTitle: any;

  currentItem: any;

  constructor() { }

  ngOnChanges() {
    if (this.definitions) {
      this.defineFormFields();
    }
  }

  /**
   * get curren item data
   */
  getCurrentItemData() {
    if (this.currentItemId !== 'new') {
      this.currentItem = this.crud.rows.find(row => row.id.toString() === this.currentItemId);
    } else {
      this.currentItem = null;
    }
  }

  /**
   * defines form fields of the detail view
   */
  defineFormFields() {
    console.log(this.definitions, this.currentItem);
    this.formFields = Object.keys(this.definitions.properties).map(definition => {
      return {label: definition, controlName: definition, type: 'text', width: '80%'};
    });
  }

}
