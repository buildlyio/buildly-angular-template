import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupsComponent } from './user-groups.component';
import { MidgardCrudModule } from '../../../../modules/crud/crud.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreMock } from '../../../../modules/store/store-mock';
import { Store } from '../../../../modules/store/store';

describe('UserGroupsComponent', () => {
  let component: UserGroupsComponent;
  let fixture: ComponentFixture<UserGroupsComponent>;
  const mockGroup = {
    name: 'Mock Group',
    permissions: {
      create: false,
      read: false,
      update: false,
      delete: false
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MidgardCrudModule],
      declarations: [ UserGroupsComponent ],
      providers: [
        {provide: Store, useClass: StoreMock},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a new group', () => {
    spyOn(component.crud, 'createItem');
    const newGroup = {
      name: 'New Group',
      permissions: {
        create: false,
        read: false,
        update: false,
        delete: false
      }
    };
    component.createGroup();
    expect(component.crud.createItem).toHaveBeenCalledWith(newGroup, 0);
  });

  it('should update the permission of a group', () => {
    spyOn(component.crud, 'updateItem');
    const expectedGroup = {
      name: 'Mock Group',
      permissions: {
        create: true,
        read: false,
        update: false,
        delete: false
      }
    };
    component.updatePermission(true, 'create', mockGroup);
    expect(component.crud.updateItem).toHaveBeenCalledWith(expectedGroup);
  });
});
