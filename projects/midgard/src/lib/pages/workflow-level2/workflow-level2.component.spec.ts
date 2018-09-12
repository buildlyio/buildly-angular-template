import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowLevel2Component } from './workflow-level2.component';

describe('WorkflowLevel2Component', () => {
  let component: WorkflowLevel2Component;
  let fixture: ComponentFixture<WorkflowLevel2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowLevel2Component ]
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
