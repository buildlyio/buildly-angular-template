import { Component, OnInit } from '@angular/core';
import { loadWorkflowLevel2Data } from '@libs/midgard/src/lib/state/midgard.actions';
import { StoreService } from '@libs/midgard/src/lib/modules/store-module/store.service';
import { Store } from '@libs/midgard/src/lib/modules/store-module/types/store';

@Component({
  selector: 'mg-workflow-level2',
  templateUrl: './workflow-level2.component.html',
  styleUrls: ['./workflow-level2.component.css']
})
export class WorkflowLevel2Component implements OnInit {
  private store: Store<any>;
  constructor(
    private storeService: StoreService,
  ) { }

  ngOnInit() {
    this.store = this.storeService.getInstance(); // get the store instance
    this.store.dispatch(loadWorkflowLevel2Data());
  }

}
