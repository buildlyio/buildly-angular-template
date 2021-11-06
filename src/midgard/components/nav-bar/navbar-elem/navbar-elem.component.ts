import { Component, Input } from '@angular/core';

@Component({
  selector: 'mg-navbar-elem',
  templateUrl: './navbar-elem.component.html',
  styleUrls: ['./navbar-elem.component.scss'],
})
export class NavBarElemComponent {
  @Input() label?: string;

  @Input() route?: string;

  @Input() icon?: string;
}
