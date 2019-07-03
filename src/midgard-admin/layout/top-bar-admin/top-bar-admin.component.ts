import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { select, Store } from '@src/midgard/modules/store/store';
import { selectTopBarOption } from '@src/midgard/state/top-bar/top-bar.actions';
import { getTopBarOptions } from '@src/midgard/state/top-bar/top-bar.selectors';
import { Subscription} from 'rxjs';
import * as config from '../../../../config.json';

@Component({
  selector: 'mg-top-bar-admin',
  templateUrl: './top-bar-admin.component.html',
  styleUrls: ['./top-bar-admin.component.scss']
})
export class TopBarComponent implements OnInit, OnDestroy {
  @Output() menuToggled: EventEmitter<any> = new EventEmitter();

  public hideMenu = false;
  public appEntryPoint = (config as any).appEntryPoint;
  public appTitle = (config as any).appTitle;
  public selectedOption: string;
  public storeSubscription: Subscription;

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit() {}

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
