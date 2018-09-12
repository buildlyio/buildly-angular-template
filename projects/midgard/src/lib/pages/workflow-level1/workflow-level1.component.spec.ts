import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowLevel1Component } from './workflow-level1.component';

describe('WorkflowLevel1Component', () => {
  let component: WorkflowLevel1Component;
  let fixture: ComponentFixture<WorkflowLevel1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowLevel1Component ]
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
