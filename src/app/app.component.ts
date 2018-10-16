import { Component, OnInit } from '@angular/core';
import { OAuthService } from '@libs/midgard-angular/src/lib/modules/oauth/oauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private oauthService: OAuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.oauthService.hasValidAccessToken()) {
      this.router.navigate(['/login']);
    }
  }
}
