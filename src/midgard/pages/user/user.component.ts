import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Store } from '@src/midgard/modules/store/store';
import { OAuthService } from '@src/midgard/modules/oauth/oauth.service';
import { Router } from '@angular/router';
import { getAuthUser } from '@src/midgard/state/authuser/authuser.selectors';
import { Subscription } from 'rxjs';
import {setTopBarOptions} from '../../state/top-bar/top-bar.actions';
import {getTopBarSelectedOption} from '../../state/top-bar/top-bar.selectors';
import {select} from '../../modules/store/store';
import { CrudDirective } from '../../modules/crud/crud.directive';

@Component({
  selector: 'mg-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  @ViewChild('crud') crud: CrudDirective;
  public userProfileFormFields;
  public selectorProfile;
  public selectedIndex;
  public storeSubscription: Subscription;
  /**
   * current tab value from the content switcher
   */
  public selectedTab = 'user-management';
  public topBarOptions = [
    {
      label: 'Profile Settings',
      value: 'user-profile'
    },
    {
      label: 'Users Management',
      value: 'user-management'
    }
  ];

  constructor(
    private store: Store<any>,
    private oauthService: OAuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.checkTopBarOptions();
  }

  /**
   * it checks the selected top bar option and show the corresponding component
   */
  checkTopBarOptions() {
    this.store.dispatch(setTopBarOptions(this.topBarOptions));
    this.storeSubscription = this.store.observable.pipe(
      select(getTopBarSelectedOption),
    ).subscribe(data => {
      if (data) {
        this.selectedTab = data.value;
        if (this.selectedTab === 'user-management') {
          this.router.navigate(['/user/list']);
        } else if (this.selectedTab === 'user-profile') {
          // this.router.navigate(['/user']);
        }
      }
    });
    this.selectorProfile = getAuthUser;
  }

  /**
   * a function calls the crud module to update a user when a field is edited
   * @param editedObj - an object with the edited element and its value
   */
  updateUser(editedObj: {value: string, elementName: string}) {
    const {value, elementName} = editedObj;
    if (elementName === 'name') {
      this.updateName(value);
    } else {
      let updatedUser;
      if (this.crud.rows.data) {
        updatedUser = {
          id: this.crud.rows.data.id,
        };
        updatedUser[elementName] = value;
      }
      this.crud.updateItem(updatedUser);
    }

  }

  /**
   * splits the full name to first_name and last name and updates the user
   */
  updateName(fullname: string) {
    let updatedUser;
    const firstName = fullname.split(' ')[0];
    const lastName = fullname.split(' ')[1];
    if (this.crud.rows.data) {
      updatedUser = {
        id: this.crud.rows.data.id,
        first_name: firstName,
        last_name: lastName
      };
    }
    this.crud.updateItem(updatedUser);
  }

  /**
   * logs out the user
   */
  logout() {
    this.oauthService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

}
