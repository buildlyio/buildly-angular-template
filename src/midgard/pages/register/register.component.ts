import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Store} from '@src/midgard/modules/store/store';
import {createCoreUser} from '@src/midgard/state/coreuser/coreuser.actions';
import { checkPasswordsValidator, FormValidationHelper } from '../../modules/form/form.validation.helper';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../modules/http/http.service';
import { environment } from '@env/environment';
import { selecteCoreUserCreated } from '../../state/coreuser/coreuser.selectors';
import { select } from '../../modules/store/store';
import * as config from '../../../../config.json';
import { OAuthService } from '../../modules/oauth/oauth.service';
import { loadAuthUser } from '../../state/authuser/authuser.actions';

@Component({
  selector: 'mg-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  error: string;
  appEntryPoint = (config as any).appEntryPoint;
  registerForm: FormGroup;
  errors = {};
  errorMessages = {
    email: 'please fill your email',
    username: 'please fill your username',
    password: 'please fill your password',
    organization: 'please fill your organization',
    confirm_password: 'This field must match your entered password'
  };
  token;

  constructor(
    private formBuilder: FormBuilder,
    private formHelper: FormValidationHelper,
    private store: Store<any>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private oauthService: OAuthService,
  ) { }

  ngOnInit() {
    // get the token from the url if there is any
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];
    });
    this.initForm();
    if (this.token) {
      this.checkToken();
    }
    this.registerForm.valueChanges.subscribe(val => {
      if (this.registerForm.errors && this.registerForm.errors.passwordMismatch) {
        this.registerForm.get('confirm_password').setErrors({'incorrect': true});
      }
      this.errors = this.formHelper.validateForm(this.registerForm, this.errorMessages);
    });
  }

  /**
   * intialises the login form
   */
  initForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      organization_name: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
    }, {validator: checkPasswordsValidator});
  }

  /**
   * send a request to register the user and auto login
   */
  register() {
    delete this.registerForm.value.confirm_password;
    this.store.dispatch(createCoreUser(this.registerForm.value));
    this.store.observable.pipe(
      select(selecteCoreUserCreated)
    ).subscribe(created => {
      if (created) {
        this.oauthService.authenticateWithPasswordFlow({username: this.registerForm.value.username, password: this.registerForm.value.password})
        .subscribe( token => {
            this.oauthService.setAccessToken(token.data);
            this.store.dispatch(loadAuthUser());
            this.router.navigate([this.appEntryPoint]);
          },
          err => {
            this.error = 'Your user has been created, please ask your organization administrator to activate it';
          });
      }
    });
  }

  /**
   * checks the invitation token of the user and fills the email address and the organization in the form if it is valid
   */
  checkToken() {
    this.httpService.makeRequest('get', `${environment.API_URL}/coreuser/invite_check/?token=${this.token}`).subscribe(res => {
      if (res.data) {
        this.registerForm.get('email').patchValue(res.data.email);
        this.registerForm.get('organization_name').patchValue(res.data.organization.name);
      }
    });
  }
}
