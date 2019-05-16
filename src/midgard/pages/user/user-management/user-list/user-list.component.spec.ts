import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MidgardCrudModule } from '@midgard/modules/crud/crud.module';
import { Store } from '@midgard/modules/store/store';
import { StoreMock } from '@midgard/modules/store/store-mock';
import { RouterTestingModule } from '@angular/router/testing';
import { GraphQlService } from '@midgard/modules/graphql/graphql.service';
import { StubService } from '@midgard/testing-utilities/stubs';
import { CoreUser } from '@midgard/state/coreuser/coreuser.model';
import { mockCoreUsers } from '@midgard/testing-utilities/mock.data';
import { Router } from '@angular/router';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let router;
  const mockRows = [
    {
      id: 5,
      first_name: 'test',
      last_name: 'testlast',
      email: 'test@test.com',
      is_active: false
    },
    {
      id: 6,
      first_name: 'test2',
      last_name: 'testlast2',
      email: 'test2@test2.com',
      is_active: true
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MidgardCrudModule, RouterTestingModule],
      declarations: [ UserListComponent ],
      providers: [
        {provide: Store, useClass: StoreMock},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should define the dropdown options for each row', () => {
    const expectedResult = [
      {
        id: 5,
        first_name: 'test',
        last_name: 'testlast',
        email: 'test@test.com',
        is_active: false,
        dropdownOptions: [
          {label: '•••', value: '•••'},
          {label: 'Change Password', value: 'changePassword'},
          {label: 'Activate', value: 'activate'},
          {label: 'Delete', value: 'delete'}
        ]
      },
      {
        id: 6,
        first_name: 'test2',
        last_name: 'testlast2',
        email: 'test2@test2.com',
        is_active: true,
        dropdownOptions: [
          {label: '•••', value: '•••'},
          {label: 'Change Password', value: 'changePassword'},
          {label: 'Deactivate', value: 'deactivate'},
          {label: 'Delete', value: 'delete'}
        ]
      }
    ];
    component.crud.rows = mockRows;
    fixture.detectChanges();
    component.defineDropdownOptions();
    expect(component.crud.rows).toEqual(expectedResult);
  });

  it('should call crud deleteItem function if the user select delete action from the dropdown', () => {
    spyOn(component.crud, 'deleteItem');
    component.dropdownActionTriggered(mockRows[0], 'delete');
    expect(component.crud.deleteItem).toHaveBeenCalledWith(mockRows[0]);
  });

  it('should call crud updateItem function if the user select activate from the dropdown', () => {
    spyOn(component.crud, 'updateItem');
    component.dropdownActionTriggered(mockRows[0], 'activate');
    expect(component.crud.updateItem).toHaveBeenCalledWith(mockRows[0]);
  });


  it('should call crud updateItem function with the updated value of the row if the user updates a field in the row', () => {
    spyOn(component.crud, 'updateItem');
    const editedObj = {
      value: 'a@gmail.com',
      elementName: 'email'
    };
    component.updateUser(editedObj, mockRows[0]);
    expect(component.crud.updateItem).toHaveBeenCalledWith({id: 5, email: 'a@gmail.com'});
  });

  it('should call the components updateName function if the edited value is the name', () => {
    spyOn(component, 'updateName');
    const editedObj = {
      value: 'newname',
      elementName: 'name'
    };
    component.updateUser(editedObj, mockRows[0]);
    expect(component.updateName).toHaveBeenCalledWith('newname', mockRows[0]);
  });

  it('should split the fullname to first name and last name and call crud updateItem function with the separated names', () => {
    spyOn(component.crud, 'updateItem');
    component.updateName('First Last', mockRows[0]);
    expect(component.crud.updateItem).toHaveBeenCalledWith({id: 5, first_name: 'First', last_name: 'Last'});
  });

});
