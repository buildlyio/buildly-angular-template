import { Component, OnInit } from '@angular/core';
import { getAllWorkflowLevel2s } from '@src/midgard/state/workflow-level2/workflow-level2.selectors';
import { setTopBarOptions } from '@src/midgard/state/top-bar/top-bar.actions';
import { Store } from '@src/midgard/modules/store/store';

@Component({
  selector: 'mg-workflow-level2',
  templateUrl: './workflow-level2.component.html',
  styleUrls: ['./workflow-level2.component.scss']
})
export class WorkflowLevel2Component implements OnInit {
  public topBarOptions = [
    {
      label: 'All',
      value: 'all'
    },
    {
      label: 'Active',
      value: 'active'
    }
  ];
  public tableOptions;
  public cardItemOptions;
  // public graphQlQuery;
  public selector;

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.selector = getAllWorkflowLevel2s;
    this.store.dispatch(setTopBarOptions(this.topBarOptions));
    this.defineCardItemOptions();
    this.defineTableOptions();
    // example of using graphQl in the system
    // this.graphQlQuery = `
    //     query getWorkflowlevel2s {
    //       workflowlevel1s {
    //         id
    //         name
    //         workflowlevel2 {
    //           id
    //           name
    //           description
    //           createDate
    //         }
    //       }
    //     }
    //   `;
  }

  /**
   * defines options for card item components
   */
  private defineCardItemOptions() {
    this.cardItemOptions = {
      title: 'name',
      subText: 'description',
      caption: 'create_date',
    };
  }

  private defineTableOptions() {
    this.tableOptions = {
      columns: [
        {name: 'Name', prop: 'name', flex: 2, sortable: true, filtering: true},
        {name: 'Description', prop: 'description', flex: 2, sortable: true, filtering: true},
        {name: 'Date Created', prop: 'create_date', index: 1, flex: 1, cellTemplate: 'date', sortable: true},
        {name: '', cellTemplate: 'actions', actions: ['delete']},
      ]
    };
  }
}
