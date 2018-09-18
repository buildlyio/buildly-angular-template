import { Component, OnInit } from '@angular/core';
import { getObservableStore, select, Store } from '@libs/midgard/src/lib/modules/store-module/store';
import { loadWorkflowLevel2Data } from '@libs/midgard/src/lib/state/midgard.actions';
import { WorkflowLevel2 } from '@libs/midgard/src/lib/pages/workflow-level2/state/workflow-level2.model';

@Component({
  selector: 'mg-workflow-level2',
  templateUrl: './workflow-level2.component.html',
  styleUrls: ['./workflow-level2.component.scss']
})
export class WorkflowLevel2Component implements OnInit {
  workflowLevel2s: WorkflowLevel2[];
  constructor(
    private store: Store<any>,
  ) {}

  ngOnInit() {
    this.store.dispatch(loadWorkflowLevel2Data());
    getObservableStore(this.store).pipe(select('midgardReducer', 'workflowLevel2', this.store.getState())).subscribe( (data: any) => {
      this.workflowLevel2s = data;
    });
  }

}
