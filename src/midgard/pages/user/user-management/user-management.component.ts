import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../../modules/http/http.service';
import { commaSepEmailValidator, FormValidationHelper } from '../../../modules/form/form.validation.helper';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  protected contentSwitcherOptions = [
    {
      label: 'Current Users',
      value: 'user-list'
    },
    {
      label: 'User Groups',
      value: 'user-groups'
    }
  ];

  public invitationForm: FormGroup;
  public errors = {};
  public showUserInvitationOverlay = false;



  constructor(
    private router: Router,
    private httpService: HttpService,
    private formHelper: FormValidationHelper,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.buildInvitationForm();
  }

  /**
   * redirect the user to the selected view from the content switcher
   * @param selectedTab
   */
  subNavChanged(selectedTab) {
    if (selectedTab.value === 'user-list') {
      this.router.navigate(['/user/user-management/list']);
    } else if (selectedTab.value === 'user-groups') {
      this.router.navigate(['/user/user-management/groups']);
    }
  }

  /**
   * sends a request to send an invitation for a new user
   */
  sendInvitation() {
    if (this.invitationForm) {
      const emails = {emails: this.invitationForm.value.email.split(',')};
      this.httpService.makeRequest('post', `${environment.API_URL}/coreuser/invite/`, emails).subscribe( res => {
        this.showUserInvitationOverlay = false;
      });
    }
  }

  /**
   * builds reactive form for user invitation overlay and validate it
   */
  buildInvitationForm() {
    this.invitationForm = this.fb.group({
      email: ['', [Validators.required, commaSepEmailValidator]]
    });
    this.invitationForm.valueChanges.subscribe(val => {
      this.errors = this.formHelper.validateForm(this.invitationForm, {email: 'please enter email address(es)'});
    });
  }
}
