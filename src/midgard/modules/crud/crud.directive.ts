import {Directive, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {GraphQlService} from '@src/midgard/modules/graphql/graphql.service';
import {map} from 'rxjs/operators';
import {select, Store} from '@src/midgard/modules/store/store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Directive({
  selector: '[mgCrud]',
  exportAs: 'mgCrud'
})
export class CrudDirective implements OnInit, OnDestroy {

  public rows = [];
  public currentItem;
  public detailsForm: FormGroup;
  public dataLoaded;
  private graphQlSubscription: Subscription;
  private storeSubscription: Subscription;

  @Input() loadAction;
  /**
   * redux action to load data from Graph QL
   */
  @Input() loadActionGraphQl;
  /**
   * redux action to create an item
   */
  @Input() createAction;
  /**
   * redux action to update an item
   */
  @Input() updateAction;
  /**
   * redux action to delete an item
   */
  @Input() deleteAction;
  /**
   * notification message when the item is created
   */
  @Input() createMessage;
  /**
   * notification message when the item is update
   */
  @Input() updateMessage;
  /**
   * notification message when the item is deleted
   */
  @Input() deleteMessage;

  /**
   * redux selector function
   */
  @Input() selector;
  /**
   * if true it uses graphQl to get the data instead http to get the data
   */
  @Input() useGraphQl;
  /**
   *  model of which value will be returned
   */
  @Input() graphQlModel;
  /**
   * graphQl model to be requested
   */
  @Input() graphQlQuery;
  /**
   * graphQl query variables
   */
  @Input() graphQlVariables;
  /**
   * definition of the form fields
   */
  @Input() formFields;

  constructor(
    private store: Store<any>, // type {any} beacuse the state of the app is not fixed and can be changed depending on the modules
    private graphQlService: GraphQlService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.dataLoaded = this.store.observable.pipe(
      select(this.selector),
      map(reducer => {
        if (reducer) {
          return reducer.loaded;
        }
      })
    );
    if (this.useGraphQl) {
      this.listenToStore();
      this.getDataUsingGraphQl();
    } else {
      this.listenToStore();
      this.getDataFromStore();
    }
  }

  /**
   * listen to redux store changes
   */
  listenToStore() {
    this.storeSubscription = this.store.observable.pipe(
      select(this.selector),
      map(reducer => reducer.data)
    ).subscribe( (data: any[]) => {
      this.rows = data;
    });
  }

  /**
   * executes graphQl query to get the data from the server
   */
  getDataUsingGraphQl() {
    this.graphQlSubscription = this.graphQlService.query(this.graphQlQuery, this.graphQlVariables).subscribe((res: any) => {
      this.store.dispatch({
        type: this.loadActionGraphQl,
        data: res.data[this.graphQlModel]
      });
    });
  }

  /**
   * gets data from redux store depending on the given loadAction (input)
   */
  getDataFromStore() {
    this.store.dispatch({
      type: this.loadAction,
    });
  }
  /**
   * send a request to create an item from the list
   * @param item - item to be created
   * @param index - index of where to push the item in the state
   */
  createItem(item: any, index?: number) {
    this.store.dispatch({
      type: this.createAction,
      data: item,
      index
    });
  }

  /**
   * send a request to delete an item from the list
   * @param item - selected item
   */
  deleteItem(item: any) {
    this.store.dispatch({
      type: this.deleteAction,
      data: item,
    });
  }

  /**
   * send a request to update an item from the list
   * @param item - selected item
   */
  updateItem(item: any) {
    this.store.dispatch({
      type: this.updateAction,
      data: item,
    });
  }

  /**
   * build the reactive form with the given formFields
   */
  buildForm() {
    const controlsConfig = this.formFields.reduce((result, currentValue) => {
      let validatorsArr = [];
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
