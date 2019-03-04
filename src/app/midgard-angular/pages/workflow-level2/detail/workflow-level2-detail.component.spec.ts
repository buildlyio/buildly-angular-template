import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowLevel2DetailComponent } from './workflow-level2-detail.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('WorkflowLevel2DetailComponent', () => {
  let component: WorkflowLevel2DetailComponent;
  let fixture: ComponentFixture<WorkflowLevel2DetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ WorkflowLevel2DetailComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowLevel2DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call defineFormFields', () => {
    spyOn(component, 'defineFormFields').and.callThrough();
    component.ngOnInit();
    expect(component.defineFormFields).toHaveBeenCalled();
  });

  it('should define graphQl query', () => {
    component.ngOnInit();
    expect(component.graphQlQuery).toBeDefined();
  });
});
