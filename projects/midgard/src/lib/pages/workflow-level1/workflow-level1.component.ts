import { Component, OnInit } from '@angular/core';
import { StoreService } from '@libs/midgard/src/lib/store-module/store.service';
import { loadWorkflowLevel1Data } from '@libs/midgard/src/lib/state/midgard.actions';
import { Store } from '@libs/midgard/src/lib/store-module/types/store';
import { MidgardState } from '@libs/midgard/src/lib/state/midgard-state.model';

@Component({
  selector: 'mg-workflow-level1',
  templateUrl: './workflow-level1.component.html',
  styleUrls: ['./workflow-level1.component.css']
})
export class WorkflowLevel1Component implements OnInit {

  private store: Store<MidgardState>;

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.store = this.storeService.getInstance();
    console.log(this.store);
    this.store.dispatch(loadWorkflowLevel1Data([{id: 1 , name: 'best program', }]));
    console.log(this.store.getState()); // yay state is changed
  }
}
