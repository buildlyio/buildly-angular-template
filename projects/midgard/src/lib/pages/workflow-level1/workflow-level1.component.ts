import { Component, OnInit } from '@angular/core';
import { loadWorkflowLevel1Data } from '@libs/midgard/src/lib/state/midgard.actions';
import { MidgardState } from '@libs/midgard/src/lib/state/midgard.model';
import { Store } from '@libs/midgard/src/lib/modules/store-module/store';

@Component({
  selector: 'mg-workflow-level1',
  templateUrl: './workflow-level1.component.html',
  styleUrls: ['./workflow-level1.component.scss']
})
export class WorkflowLevel1Component implements OnInit {

  constructor(
    private store: Store<MidgardState>,
  ) { }

  ngOnInit() {
    this.store.dispatch(loadWorkflowLevel1Data());
  }
}
