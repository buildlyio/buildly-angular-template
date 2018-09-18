import { Component, OnInit } from '@angular/core';
import { Store } from '@libs/midgard/src/lib/modules/store-module/store';
import { loadWorkflowLevel1Data } from '@libs/midgard/src/lib/state/midgard.actions';

@Component({
  selector: 'mg-workflow-level1',
  templateUrl: './workflow-level1.component.html',
  styleUrls: ['./workflow-level1.component.scss']
})
export class WorkflowLevel1Component implements OnInit {

  constructor(
    private store: Store<any>, // type {any} beacuse the state of the app is not fixed and can be changed depending on the modules
  ) { }

  ngOnInit() {
    this.store.dispatch(loadWorkflowLevel1Data());
    this.store.subscribe( () => console.log(this.store.getState()));
  }
}
