/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Component, EventEmitter, Input, OnDestroy, OnInit, Output,
} from '@angular/core';
import { select, Store } from '@src/midgard/modules/store/store';
import { Subscription } from 'rxjs';
import { GraphQlService } from '@src/midgard/modules/graphql/graphql.service';
import { map } from 'rxjs/operators';
import { addAll, deleteOne, upsertOne } from '@src/midgard/modules/store/reducer.utils';
import { getTopBarSearchValue } from '../../state/top-bar/top-bar.selectors';
import { selectAllfromEndpoint } from './redux/crud.selectors';
import {
  crudCreate, crudDelete, crudLoadData, crudUpdate,
} from './redux/crud.actions';

@Component({
  selector: 'mg-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent implements OnInit, OnDestroy {
  public rows = [];

  public dataLoaded;

  private graphQlSubscription: Subscription;

  private storeSubscription: Subscription;

  protected searchValue: string;

  /**
   * the endpoint to request
   */
  @Input() endpoint: any;

  /**
   * property that stores the data
   */
  @Input() dataProp: any;

  /**
   * the id property of the endpoint
   */
  @Input() idProp: any;

  /**
   * options for the table component
   */
  @Input() tableOptions: any;

  /**
   * options for the card item components
   */
  @Input() cardItemOptions: any;

  /**
   * page title
   */
  @Input() title: any;

  /**
   * redux action to load data
   */
  @Input() loadAction: any;

  /**
   * redux action to delete an item
   */
  @Input() deleteAction: any;

  /**
   * redux action to update an item
   */
  @Input() updateAction: any;

  /**
   * redux action to create an item
   */
  @Input() createAction: any;

  /**
   * notification message when the item is deleted
   */
  @Input() deleteMessage: any;

  /**
   * redux selector function to retrieve data list
   */
  @Input() dataSelector: any;

  /**
   * redux selector function to check if the data is loaded
   */
  @Input() loadedSelector: any;

  /**
   *  parent model if children exists
   */
  @Input() parentModel: any;

  /**
   * text of the add button
   */
  @Input() addButtonText?: string;

  /**
   * text of the add button
   */
  @Input() addButtonTextChildren: any;

  /**
   * default layout of the cards
   */
  @Input() defaultLayout: any;

  /**
   * event that is triggered when an action from the card-item or the table component is triggered
   */
  @Output() itemActionClicked: EventEmitter<any> = new EventEmitter();

  /**
   * event that is triggered when a field has been edited
   */
  @Output() itemEdited: EventEmitter<any> = new EventEmitter();

  /**
   * event that is triggered when an action from the table component is triggered
   */
  @Output() tableActionClicked: EventEmitter<any> = new EventEmitter();

  /**
   * event that is triggered when an item in the table is clicked
   */
  @Output() tableItemClicked: EventEmitter<any> = new EventEmitter();

  /**
   * event that is triggered when the user clicks on the add button
   */
  @Output() addButtonClicked: EventEmitter<any> = new EventEmitter();

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

  /**
   * event that is triggered when the data is loaded
   */
  @Output() dataLoadedFromStore: EventEmitter<any> = new EventEmitter();

  public view: 'tile' | 'list' | 'table' | 'data-table';

  constructor(
    private store: Store<any>, // type {any} beacuse the state of the app is not fixed and can be changed depending on the modules
  ) { }

  ngOnInit() {
    // listen if search value Changes from the top bar
    this.dataLoaded = this.store.observable.pipe(
      select(getTopBarSearchValue),
    ).subscribe((searchValue) => {
      this.searchValue = searchValue;
    });
    if (this.tableOptions) {
      this.view = this.defaultLayout;
    } else if (this.cardItemOptions && this.defaultLayout) {
      this.view = this.defaultLayout;
    } else if (this.cardItemOptions && !this.defaultLayout) {
      this.view = 'list';
    }
    this.dataLoaded = this.store.observable.pipe(
      select(this.loadedSelector),
      map((loaded) => {
        if (loaded) {
          return loaded;
        }
      }),
    );
    this.listenToStore();
    this.getDataFromStore();
  }

  /**
   * listen to redux store changes
   */
  listenToStore() {
    if (this.dataSelector) {
      this.storeSubscription = this.store.observable.pipe(
        select(this.dataSelector),
      ).subscribe((data: any[]) => {
        if (data) {
          this.rows = data;
          this.dataLoadedFromStore.emit(this.rows);
        }
      });
    } else if (this.endpoint) {
      this.storeSubscription = this.store.observable.pipe(
        select(selectAllfromEndpoint(this.endpoint)),
      ).subscribe((data: any[]) => {
        if (data) {
          this.rows = data;
          this.dataLoadedFromStore.emit(this.rows);
        }
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
      });
    } else if (this.endpoint) {
      this.store.dispatch(crudLoadData(this.endpoint, this.idProp || null, this.dataProp || null));
    }
  }

  /**
   * send a request to delete an item from the list
   * @param item - selected item
   */
  deleteItem(item: any) {
    if (this.deleteAction) {
      this.store.dispatch({
        type: this.deleteAction,
        data: item,
      });
    } else if (this.endpoint) {
      this.store.dispatch(crudDelete(item, this.endpoint, this.idProp || null, this.dataProp || null));
    }
    this.itemDeleted.emit(item);
  }

  /**
   * send a request to create an item from the list
   * @param item - item to be created
   * @param index - index of where to push the item in the state
   */
  createItem(item: any, index?: number) {
    if (this.createAction) {
      this.store.dispatch({
        type: this.createAction,
        data: item,
        index,
      });
    } else if (this.endpoint) {
      this.store.dispatch(crudCreate(item, this.endpoint, this.idProp || null, this.dataProp || null));
    }
    this.itemCreated.emit(item);
  }

  /**
   * send a request to update an item from the list
   * @param item - item to be updated
   * @param index - index of where to push the item in the state
   */
  updateItem(item: any, index?: number) {
    if (this.updateAction) {
      this.store.dispatch({
        type: this.updateAction,
        data: item,
      });
    } else if (this.endpoint) {
      this.store.dispatch(crudUpdate(item, this.endpoint, this.idProp || null, this.dataProp || null));
    }
    this.itemUpdated.emit(item);
  }

  /**
   * changes the view to list view
   * {'tile' | 'list'} view - the selected view
   */
  selectView(view: any) {
    this.view = view;
  }

  /**
   * function that listens if an action from the card-item or table component has been triggered
   * @param {string} actionType - type of the action that has been triggered
   * @param {string} item - the curren item data
   */
  onItemActionClicked(actionType: any, item: any) {
    const emittedObj = {
      actionType,
      item,
    };
    this.itemActionClicked.emit(emittedObj);
  }

  /**
   * function that listens if an action from the table component has been triggered
   * @param {string} actionType - type of the action that has been triggered
   * @param {string} item - the curren item data
   */
  onTableActionClicked(actionType: any, item: any) {
    const emittedObj = {
      actionType,
      item,
    };
    this.tableActionClicked.emit(emittedObj);
  }

  /**
   * function that listens if an item is clicked in the table
   * @param {string} item - the clicked item data
   */
  onTableItemClicked(item: any) {
    this.tableItemClicked.emit(item);
  }

  /**
   * function that listens if an element has been edited inline
   * @param {value : string, elementName: string} editedObj - object that contains the edited value and element
   * @param {string} itemData - the current item data
   * @param {boolean} table - if the element is edited from a table
   */
  onItemEdited(editedObj: any, itemData: any, table: any) {
    let property;
    const { value, elementName, index } = editedObj;
    if (table) {
      property = elementName;
    } else if (index !== undefined) {
      property = this.cardItemOptions[elementName][index].prop;
    } else {
      property = this.cardItemOptions[elementName].prop;
    }
    const editedField = {
      value,
      property,
      itemData,
    };
    this.itemEdited.emit(editedField);
  }

  /**
   * @param {string} view - the view of the crud module
   * @param {} evt - click event
   */
  addNewElement(view: string) {
    this.onItemActionClicked('new', null);
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
