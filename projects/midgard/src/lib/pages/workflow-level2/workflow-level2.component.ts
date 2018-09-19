import { Component, OnInit } from '@angular/core';
import { select, Store } from '@libs/midgard/src/lib/modules/store-module/store';
import { WorkflowLevel2 } from '@libs/midgard/src/lib/pages/workflow-level2/state/workflow-level2.model';
import { WorkflowLevel1 } from '@libs/midgard/src/lib/pages/workflow-level1/state/workflow-level1.model';
import { loadWorkflowLevel2Data } from '@libs/midgard/src/lib/state/midgard.actions';

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
    this.store.observable.pipe(
      select('midgardReducer', 'workflowLevel2')
    ).subscribe( (data: WorkflowLevel1[]) => {
      this.workflowLevel2s = data;
    });
  }

}
