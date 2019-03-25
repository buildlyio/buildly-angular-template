import {Component, OnInit} from '@angular/core';
import {environment} from '@env/environment';
import {HttpService} from '../../../modules/http/http.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'mg-user-invite',
  templateUrl: './user-invite.component.html',
  styleUrls: ['./user-invite.component.css']
})
export class UserInviteComponent implements OnInit {
  public formFields;

  constructor (
    private httpService: HttpService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.defineFormFields();
  }

  /**
   * defines form fields of the detail view
   */
  defineFormFields() {
    this.formFields = [
      {label: 'Email', controlName: 'email', type: 'text', validators: ['required', 'email'], errorMessage: 'please enter an email address'}
    ];
  }

  /**
   * function that is triggered with the form is submitted
   * data - data submitted in the form
   */
  onFormSubmitted(data: {item: any; isNew: boolean}) {
    if (data.isNew) {
      const emails = {emails: [data.item.email]};
      this.httpService.makeRequest('post', `${environment.API_URL}/coreuser/invite/`, emails).subscribe( res => {
        this.snackBar.open('The user has been invited', 'Ok', {
          duration: 2000,
        });
      });
    }
  }
}
