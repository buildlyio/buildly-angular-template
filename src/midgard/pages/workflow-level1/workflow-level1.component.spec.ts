import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowLevel1Component } from './workflow-level1.component';
import { MidgardStoreModule } from '@src/midgard/modules/store/store.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('WorkflowLevel1Component', () => {
  let component: WorkflowLevel1Component;
  let fixture: ComponentFixture<WorkflowLevel1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MidgardStoreModule.forRoot(), ApolloTestingModule],
      declarations: [ WorkflowLevel1Component ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowLevel1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
