import { Component, OnInit } from '@angular/core';
import { loadWorkflowLevel2Data } from '@libs/midgard/src/lib/state/midgard.actions';
import { Store } from '@libs/midgard/src/lib/modules/store-module/store';
import { MidgardState } from '@libs/midgard/src/lib/state/midgard.model';

@Component({
  selector: 'mg-workflow-level2',
  templateUrl: './workflow-level2.component.html',
  styleUrls: ['./workflow-level2.component.scss']
})
export class WorkflowLevel2Component implements OnInit {
  constructor(
    private store: Store<MidgardState>,
  ) { }

  ngOnInit() {
    this.store.dispatch(loadWorkflowLevel2Data());
  }

}
