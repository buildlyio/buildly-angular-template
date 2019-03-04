import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { select, Store } from '@libs/midgard-angular/src/lib/modules/store/store';
import { Subscription } from 'rxjs';
import { GraphQlService } from '@libs/midgard-angular/src/lib/modules/graphql/graphql.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators';
import { MatSnackBar } from '@angular/material';
import { CREATE_PRODUCT_COMMIT, LOAD_ALL_PRODUCTS_COMMIT, LOAD_ONE_PRODUCT_COMMIT } from '@libs/products/src/lib/state/products.actions';
import { addAll, deleteOne, upsertOne } from '@libs/midgard-angular/src/lib/modules/store/reducer.utils';

@Component({
  selector: 'mg-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit, OnDestroy {

  public rows = [];
  public dataLoaded;
  private graphQlSubscription: Subscription;
  private storeSubscription: Subscription;

  /**
   * options for the table component
   */
  @Input() tableOptions;
  /**
   * options for the card item components
   */
  @Input() cardItemOptions;
  /**
   * page title
   */
  @Input() title;
  /**
   * redux action to load data
   */
  @Input() loadAction;
  /**
   * redux action to load data from Graph QL
   */
  @Input() loadActionGraphQl;
  /**
   * redux action to delete an item
   */
  @Input() deleteAction;
  /**
   * redux action to update an item
   */
  @Input() updateAction;
  /**
   * redux action to create an item
   */
  @Input() createAction;
  /**
   * notification message when the item is deleted
   */
  @Input() deleteMessage;
  /**
   * redux selector function
   */
  @Input() selector;
  /**
   *  parent model if children exists
   */
  @Input() parentModel;
  /**
   * text of the add button
   */
  @Input() addButtonText;
  /**
   * text of the add button
   */
  @Input() addButtonTextChildren;
  /**
   * if true it uses graphQl to get the data instead http to get the data
   */
  @Input() useGraphQl;
  /**
   *  model of which value will be returned
   */
  @Input() graphQlModel;
  /**
   * model of the children elements
   * !important currently only two levels supported
   */
  @Input() graphQlChildrenModel;
  /**
   * graphQl model to be requested
   */
  @Input() graphQlQuery;
  /**
   * graphQl query variables
   */
  @Input() graphQlVariables;
  /**
   * main route of details page
   */
  @Input() detailsRoute;
  /**
   * default layout of the cards
   */
  @Input() defaultLayout;

  /**
   * event that is triggered when an action from the card-item component is triggered
   */
  @Output() cardItemActionClicked: EventEmitter<any> = new EventEmitter();
  /**
   * event that is triggered when a field has been edited in the card
   */
  @Output() cardItemEdited: EventEmitter<any> = new EventEmitter();
  /**
   * event that is triggered when an action from the table component is triggered
   */
  @Output() tableActionClicked: EventEmitter<any> = new EventEmitter();
  /**
   * event that is triggered when a new item has been created
   */
  @Output() itemCreated: EventEmitter<any> = new EventEmitter();
  /**
   * event that is triggered when a new item has been deleted
   */
  @Output() itemDeleted: EventEmitter<any> = new EventEmitter();
  /**
   * event that is triggered when a new item has been updated
   */
  @Output() itemUpdated: EventEmitter<any> = new EventEmitter();

  public view: 'tile' | 'list' | 'table' | 'data-table';

  constructor(
    private store: Store<any>, // type {any} beacuse the state of the app is not fixed and can be changed depending on the modules
    private graphQlService: GraphQlService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.tableOptions) {
      this.view = this.defaultLayout;
    } else if (this.cardItemOptions && this.defaultLayout) {
      this.view = this.defaultLayout;
    } else if (this.cardItemOptions && !this.defaultLayout) {
      this.view = 'list';
    }
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
      map(reducer => {
        if (reducer && reducer.data) {
          return reducer.data;
        }
      })
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
   * navigates to the detail page of the selected item
   * @param {object} row - the current row
   * @param {object} event - the click event or the selected item if it is a table
   */
  goToDetailsPage(row, event: any) {
    if (this.detailsRoute) {
      if (!row) {
        this.router.navigate([`${this.detailsRoute}/new`]);
      } else {
        this.router.navigate([`${this.detailsRoute}${row.id}/`]);
      }
    }
    // else {
      // Deprecated GraphQl Implementation in the crud module
      // if (!event.id) { // if is not a table item
      //   event.stopPropagation();
      //   this.router.navigate([`${this.detailsRoute}${row.id}/new`]);
      // } else {
      //   this.router.navigate([`${this.detailsRoute}${row.id}/${event.id}`]);
      // }
    // }
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
    this.itemDeleted.emit();
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
    this.itemCreated.emit();
  }

  /**
   * send a request to update an item from the list
   * @param item - item to be updated
   * @param index - index of where to push the item in the state
   */
  updateItem(item: any, index?: number) {
    this.store.dispatch({
      type: this.updateAction,
      data: item
    });
    this.itemUpdated.emit();
  }

  /**
   * changes the view to list view
   * {'tile' | 'list'} view - the selected view
   */
  selectView(view) {
    this.view = view;
  }

  /**
   * function that listens if an action from the card-item component has been triggered
   * @param {string} actionType - type of the action that has been triggered
   * @param {string} item - the curren item data
   */
  onCardItemActionClicked(actionType, item) {
    const emittedObj = {
      actionType,
      item
    };
    this.cardItemActionClicked.emit(emittedObj);
  }

  /**
   * function that listens if an action from the table component has been triggered
   * @param {string} actionType - type of the action that has been triggered
   * @param {string} item - the curren item data
   */
  onTableActionClicked(actionType, item) {
    const emittedObj = {
      actionType,
      item
    }
    this.tableActionClicked.emit(emittedObj);
  }

  /**
   * function that listens if an element has been edited inline in the card item component
   * @param {value : string, element: string} editedObj - object that contains the edited value and element
   * @param {string} itemData - the current item data
   */
  onCardItemEdited(editedObj, itemData) {
    let property;
    const value = editedObj.value;
    if (editedObj.index !== undefined) {
      property = this.cardItemOptions[editedObj.elementName][editedObj.index].prop;
    } else {
      property = this.cardItemOptions[editedObj.elementName].prop;
    }
    const editedField = {
      value,
      property,
      itemData
    };
    this.cardItemEdited.emit(editedField);
  }

  /**
   * @param {string} view - the view of the crud module
   * @param {} evt - click event
   */
  addNewElement(view: string) {
    if (this.defaultLayout === 'data-table') {
      this.goToDetailsPage(null, null);
    } else {
      this.onCardItemActionClicked('new', null);
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
