import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FormValidationHelper} from './form.validation.helper';
import { Store } from '../store/store';

@Component({
  selector: 'mg-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {

  public dataLoaded;
  public detailsForm: FormGroup;
  private storeSubscription: Subscription;

  /**
   * The current Item data to be shown in the form
   */
  @Input() currentItemData;
  /**
   * notification message when the item is created
   */
  @Input() createMessage: string;
  /**
   * redux action to update current Item if exists
   */
  @Input() updateMessage: string;
  /**
   * previous page route
   */
  @Input() backRoute: string;
  /**
   * text of the back button
   */
  @Input() backButtonText: string;
  /**
   * text of the add button
   */
  @Input() addButtonText: string;
  /**
   * text of the edit button
   */
  @Input() editButtonText: string;
  /**
   * property of the current object to be used as the title
   */
  @Input() titleProp: string;
  /**
   * custom title for the form
   */
  @Input() title: string;
  /**
   * definition of the form fields
   */
  @Input() formFields;
  /**
   * freyja theme to be used in the inputs
   */
  @Input() freyjaTheme;
  /**
   * redux action to update an item
   */
  @Input() updateAction;
  /**
   * redux action to create an item
   */
  @Input() createAction;
  /**
   * event that is triggered when the form has been submitted
   */
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();


  public errorMessages = {};

  public errors = {};

  constructor(
    private formHelper: FormValidationHelper,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<any>
  ) {}

  ngOnInit() {
    if (this.currentItemData) {
      // build empty reactive form
      this.buildForm();
    }
  }

  /**
   * build the reactive form with the given form fields
   */
  buildForm() {
    const controlsConfig = this.formFields.reduce((result, currentValue) => {
      let validatorsArr = [];
      this.errorMessages[currentValue.controlName] = currentValue.errorMessage;
      if (currentValue.validators) {
        validatorsArr = currentValue.validators.reduce((arr, validatorName) => {
          arr.push(Validators[validatorName]);
          return arr;
        }, []);
      }
      if (this.currentItemData) {
        result[currentValue.controlName] = [this.currentItemData[currentValue.controlName], validatorsArr];
      } else {
        result[currentValue.controlName] = ['', validatorsArr];
      }
      return result;
    }, {});
    this.detailsForm = this.fb.group(controlsConfig);
    // add validation for the form
    if (this.errorMessages) {
      this.detailsForm.valueChanges.subscribe(val => {
        this.errors = this.formHelper.validateForm(this.detailsForm, this.errorMessages);
      });
    }
  }

  /**
   * sends an action to add or edit the item if it exists
   */
  submitForm() {
    if (!this.itemId) {
      this.formSubmitted.emit({item: this.detailsForm.value, isNew: true});
    } else {
      this.formSubmitted.emit({item: {...this.currentItemData, ...this.detailsForm.value, isNew: false}});
    }
  }
  /**
   * navigates to the list page
   */
  goToListPage() {
    if (this.backRoute) {
      this.router.navigate([`${this.backRoute}`]);
    }
  }

  /**
   * sends a request to create an item
   * @param item - item to be created
   */
  createItem(item) {
    this.store.dispatch({
      type: this.createAction,
      data: item,
    });
  }

  /**
   * sends a request to update an item
   * @param item - item to be created
   */
  updateItem(item) {
    this.store.dispatch({
      type: this.updateAction,
      data: item,
    });
  }

  ngOnDestroy() {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

}
