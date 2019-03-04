import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OAuthService } from '@libs/midgard-angular/src/lib/modules/oauth/oauth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private oauthService: OAuthService,
    private router: Router,
  ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.oauthService.hasValidAccessToken()) {
      this.router.navigate(['/login']);
    }
    return true;
  }
}
