import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription} from 'rxjs';
import { OAuthService } from '@midgard/modules/oauth/oauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mg-top-bar-admin',
  templateUrl: './top-bar-admin.component.html',
  styleUrls: ['./top-bar-admin.component.scss']
})
export class TopBarAdminComponent implements OnInit, OnDestroy {
  @Output() menuToggled: EventEmitter<any> = new EventEmitter();

  public hideMenu = false;
  public selectedOption: string;
  public storeSubscription: Subscription;

  constructor(
    private oauthService: OAuthService,
    private router: Router
  ) {}

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

  logOut() {
    this.oauthService.logout();
    this.router.navigate(['/admin-panel']);
  }

}
