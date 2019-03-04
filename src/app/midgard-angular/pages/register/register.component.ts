import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Store} from '@libs/midgard-angular/src/lib/modules/store/store';
import {createCoreUser} from '@libs/midgard-angular/src/lib/state/coreuser/coreuser.actions';
import {FormValidationHelper} from '../../modules/form/form.validation.helper';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {HttpService} from '../../modules/http/http.service';
import {environment} from '../../../../../../src/environments/environment';

@Component({
  selector: 'mg-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup;
  errors = {};
  errorMessages = {
    email: 'please fill your email',
    username: 'please fill your username',
    password: 'please fill your password',
    organization: 'please fill your organization',
  };
  token;

  constructor(
    private formBuilder: FormBuilder,
    private formHelper: FormValidationHelper,
    private store: Store<any>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
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
      this.errors = this.formHelper.validateForm(this.registerForm, this.errorMessages);
    });
  }

  /**
   * intialises the login form
   */
  initForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.email],
      username: ['', Validators.required],
      password: ['', Validators.required],
      organization_name: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
    });
  }

  /**
   * send a request to register the user
   */
  register() {
    this.store.dispatch(createCoreUser(this.registerForm.value));
    // this.snackBar.open('Your user has been created', 'Ok', {
    //   duration: 2000,
    // });
    this.router.navigate(['/login']);
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
