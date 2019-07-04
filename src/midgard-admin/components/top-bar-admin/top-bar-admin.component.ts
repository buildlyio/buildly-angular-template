import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription} from 'rxjs';
import * as config from '../../../../config.json';

@Component({
  selector: 'mg-top-bar-admin',
  templateUrl: './top-bar-admin.component.html',
  styleUrls: ['./top-bar-admin.component.scss']
})
export class TopBarAdminComponent implements OnInit, OnDestroy {
  @Output() menuToggled: EventEmitter<any> = new EventEmitter();

  public hideMenu = false;
  public appEntryPoint = (config as any).appEntryPoint;
  public appTitle = (config as any).appTitle;
  public selectedOption: string;
  public storeSubscription: Subscription;

  constructor() {}

  ngOnInit() {}

  toggleMenu() {
    this.hideMenu = !this.hideMenu;
    this.menuToggled.emit(this.hideMenu);
  }

  ngOnDestroy() {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

}
