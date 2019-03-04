import { Component, OnInit } from '@angular/core';
import { Store } from './modules/store/store';
import { loadAuthUser } from './state/authuser/authuser.actions';

@Component({
  selector: 'mg-midgard',
  templateUrl: './midgard.component.html',
  styleUrls: ['./midgard.component.scss']
})
export class MidgardComponent implements OnInit {

  constructor(
    private store: Store<any>
  ) {}

  public hideMenu = false;

  ngOnInit() {
    this.store.dispatch(loadAuthUser()); // get authenticated user
  }

  toggleMenu(menuToggle) {
    this.hideMenu = menuToggle;
  }

}
