import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowLevel2Component } from './workflow-level2.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreMock } from '../../../modules/store/store-mock';
import { Store } from '../../../modules/store/store';
import { MidgardStoreModule } from '../../../modules/store/store.module';

describe('WorkflowLevel2Component', () => {
  let component: WorkflowLevel2Component;
  let fixture: ComponentFixture<WorkflowLevel2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MidgardStoreModule.forRoot()],
      declarations: [ WorkflowLevel2Component ],
      providers: [
        {provide: Store, useClass: StoreMock}
      ],
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
