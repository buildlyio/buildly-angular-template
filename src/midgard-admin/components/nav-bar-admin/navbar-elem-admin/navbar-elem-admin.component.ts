import { Component, Input } from '@angular/core';

@Component({
  selector: 'mg-navbar-elem-admin',
  templateUrl: './navbar-elem-admin.component.html',
  styleUrls: ['./navbar-elem-admin.component.scss']
})
export class NavBarElemAdminComponent {
  @Input() label: string;
  @Input() route: string;
  @Input() icon: string;
}
