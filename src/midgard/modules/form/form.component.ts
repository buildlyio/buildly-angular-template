import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { select, Store } from '../store/store';
import { of, Subscription } from 'rxjs';
import { GraphQlService } from '../graphql/graphql.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/internal/operators';
import { MatSnackBar } from '@angular/material';
import {FormValidationHelper} from './form.validation.helper';

@Component({
  selector: 'mg-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {

  public dataLoaded;
  public currentItem;
  public detailsForm: FormGroup;
  private graphQlSubscription: Subscription;
  private storeSubscription: Subscription;

  /**
   * id of an element to show in the form
   */
  @Input() itemId;
  /**
   * redux action to load an item
   */
  @Input() loadAction: string;
  /**
   * redux action to add a new item
   */
  @Input() createAction: string;
  /**
   * notification message when the item is created
   */
  @Input() createMessage: string;
  /**
   * redux action to update current Item if exists
   */
  @Input() updateAction: string;
  /**
   * notification message when the item is updated
   */
  @Input() updateMessage: string;
  /**
   * redux reducer selector
   */
  @Input() selector;
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
   * event that is triggered when the form has been submitted
   */
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();


  public errorMessages = {};

  public errors = {};

  constructor(
    private store: Store<any>, // type {any} beacuse the state of the app is not fixed and can be changed depending on the modules
    private formHelper: FormValidationHelper,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    if (this.loadedSelector) {
      this.dataLoaded = this.store.observable.pipe(
        select(this.selector),
        map(reducer => {
          if (reducer) {
            return reducer.loaded;
          }
        })
      );
    } else {
      this.dataLoaded = of(true);
    }
    if (this.itemId && this.selector) {
        this.getDataFromStore();
    } else {
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
      if (this.currentItem) {
        result[currentValue.controlName] = [this.currentItem[currentValue.controlName], validatorsArr];
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
   * gets data from redux store depending on the given loadAction (input)
   */
  getDataFromStore() {
    if (this.loadAction) {
      this.store.dispatch({
        type: this.loadAction,
        id: this.itemId
      });
    }
    this.storeSubscription = this.store.observable.pipe(
      select(this.selector),
      map(reducer => {
        if (reducer) {
          return reducer.data;
        }
      })
    ).subscribe( (res: any) => {
      if (Array.isArray(res)) {  // check if the item is an array
        // if true find the current item in the array
        this.currentItem = res.find(item => Number(item.id) === Number(this.itemId));
      } else {
        this.currentItem = res;
      }
      // build reactive form initialised with the current item data
      this.buildForm();
    });
  }

  /**
   * sends an action to add or edit the item if it exists
   */
  submitForm() {
    if (!this.itemId) {
      this.formSubmitted.emit({item: this.detailsForm.value, isNew: true});
    } else {
      this.formSubmitted.emit({item: {...this.currentItem, ...this.detailsForm.value, isNew: false}});
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

  /**
   * navigates to the list page
   */
  goToListPage() {
    if (this.backRoute) {
      this.router.navigate([`${this.backRoute}`]);
    }
  }

  ngOnDestroy() {
    if (this.graphQlSubscription) {
      this.graphQlSubscription.unsubscribe();
    }
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

}
