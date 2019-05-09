import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MidgardCrudModule } from '../../../modules/crud/crud.module';
import { Store } from '../../../modules/store/store';
import { StoreMock } from '../../../modules/store/store-mock';
import { RouterTestingModule } from '@angular/router/testing';
import { GraphQlService } from '../../../modules/graphql/graphql.service';
import { StubService } from '../../../testing-utilities/stubs';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MidgardCrudModule, RouterTestingModule],
      declarations: [ UserListComponent ],
      providers: [
        {provide: Store, useClass: StoreMock},
        {provide: GraphQlService, useClass: StubService}
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

  it('should define the dropdown options', () => {
    expect(component).toBeTruthy();
  });
});
