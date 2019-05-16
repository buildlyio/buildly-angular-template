import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementComponent } from './user-management.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpService } from '../../../modules/http/http.service';
import { StubService } from '../../../testing-utilities/stubs';
import { FormValidationHelper } from '../../../modules/form/form.validation.helper';
import { ReactiveFormsModule } from '@angular/forms';

describe('UserManagementComponent', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [ UserManagementComponent ],
      providers: [
        {provide: HttpService, useClass: StubService},
        {provide: FormValidationHelper, useClass: StubService},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
