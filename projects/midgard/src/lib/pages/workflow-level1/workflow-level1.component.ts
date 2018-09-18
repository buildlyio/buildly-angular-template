import { Component, OnInit } from '@angular/core';
import { getObservableStore, select, Store } from '@libs/midgard/src/lib/modules/store-module/store';
import { loadWorkflowLevel1Data } from '@libs/midgard/src/lib/state/midgard.actions';
import { WorkflowLevel1 } from '@libs/midgard/src/lib/pages/workflow-level1/state/workflow-level1.model';

@Component({
  selector: 'mg-workflow-level1',
  templateUrl: './workflow-level1.component.html',
  styleUrls: ['./workflow-level1.component.scss']
})
export class WorkflowLevel1Component implements OnInit {
  public workflowLevel1s: WorkflowLevel1[];

  constructor(
    private store: Store<any>, // type {any} beacuse the state of the app is not fixed and can be changed depending on the modules
  ) { }

  ngOnInit() {
    this.store.dispatch(loadWorkflowLevel1Data());
    getObservableStore(this.store).pipe(
      select('midgardReducer', 'workflowLevel1', this.store.getState())
    ).subscribe( (data: WorkflowLevel1[]) => {
      this.workflowLevel1s = data;
    });
  }
}
