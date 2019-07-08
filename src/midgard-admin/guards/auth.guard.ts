import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OAuthService } from '@src/midgard/modules/oauth/oauth.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(
    private oauthService: OAuthService,
    private router: Router,
  ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.oauthService.hasValidAccessToken()) {
      this.router.navigate(['/admin-panel']);
    }
    return true;
  }
}
