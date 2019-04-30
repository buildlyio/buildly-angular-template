import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Store } from '@src/midgard/modules/store/store';
import { OAuthService } from '@src/midgard/modules/oauth/oauth.service';
import { Router } from '@angular/router';
import { getAuthUser } from '@src/midgard/state/authuser/authuser.selectors';
import { Subscription } from 'rxjs';
import {setTopBarOptions} from '../../state/top-bar/top-bar.actions';
import {getTopBarSelectedOption} from '../../state/top-bar/top-bar.selectors';
import {select} from '../../modules/store/store';
import {FormComponent} from '../../modules/form/form.component';

@Component({
  selector: 'mg-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  @ViewChild('crudForm') crudForm: FormComponent;
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
      label: 'Privacy',
      value: 'privacy'
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
    this.store.dispatch(setTopBarOptions(this.topBarOptions));
    this.storeSubscription = this.store.observable.pipe(
      select(getTopBarSelectedOption),
    ).subscribe(data => {
      if (data) {
        this.selectedTab = data.value;
        if (this.selectedTab === 'user-management') {
          this.router.navigate(['/user/list']);
        } else if (this.selectedTab === 'user-profile') {
          this.router.navigate(['/user']);
        }
      }
    });
    this.selectorProfile = getAuthUser;
    this.defineFormFields();
  }

  /**
   * defines form fields of the detail view
   */
  defineFormFields() {
    this.userProfileFormFields = [
      {label: 'Firstname', controlName: 'first_name', type: 'text', validators: ['required'], errorMessage: 'please fill your first name' },
      {label: 'Lastname', controlName: 'last_name', type: 'text', validators: ['required'], errorMessage: 'please fill your last name' },
      {label: 'Username', controlName: 'username', type: 'text', validators: ['required'], errorMessage: 'please your username' },
      // {label: 'Email', controlName: 'email', type: 'text', validators: ['required'] }
    ];
  }

  /**
   * function that is triggered with the form is submitted
   * data - data submitted in the form
   */
  onFormSubmitted(data: {item: any; isNew: boolean}) {
    if (data.isNew) {
      this.crudForm.createItem(data.item);
    } else {
      this.crudForm.updateItem(data.item);
    }
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
