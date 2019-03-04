import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowLevel2Component } from './workflow-level2.component';
import { MidgardStoreModule } from '@src/midgard/modules/store/store.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('WorkflowLevel2Component', () => {
  let component: WorkflowLevel2Component;
  let fixture: ComponentFixture<WorkflowLevel2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MidgardStoreModule.forRoot()],
      declarations: [ WorkflowLevel2Component ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowLevel2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
