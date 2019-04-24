import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { select, Store } from '@src/midgard/modules/store/store';
import { selectTopBarOption } from '@src/midgard/state/top-bar/top-bar.actions';
import { getTopBarOptions } from '@src/midgard/state/top-bar/top-bar.selectors';
import {Observable, Subscription} from 'rxjs';
import * as config from '../../../../config.json';
import {getTopBarSelectedOption} from '../../state/top-bar/top-bar.selectors';
import {distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'mg-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit, OnDestroy {
  @Output() menuToggled: EventEmitter<any> = new EventEmitter();

  public hideMenu = false;
  public subNavOptions: Observable<any[]>;
  public appEntryPoint = (config as any).appEntryPoint;
  public appTitle = (config as any).appTitle;
  public selectedOption: string;
  public storeSubscription: Subscription;

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.subNavOptions = this.store.observable.pipe(select(getTopBarOptions));
    this.storeSubscription = this.store.observable.pipe(
      select(getTopBarSelectedOption),
      distinctUntilChanged(),
    ).subscribe(data => {
      if (data) {
        this.selectedOption = data.value;
      }
    });
  }

  toggleMenu() {
    this.hideMenu = !this.hideMenu;
    this.menuToggled.emit(this.hideMenu);
  }

  /**
   * function that will be triggered when the sab navigation changes value
   * @param item - the selected item
   */
  subNavChanged(item) {
    this.store.dispatch(selectTopBarOption(item));
  }

  ngOnDestroy() {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

}
