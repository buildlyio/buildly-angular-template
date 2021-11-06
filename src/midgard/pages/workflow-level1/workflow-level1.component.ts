import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mg-workflow-level1',
  templateUrl: './workflow-level1.component.html',
  styleUrls: ['./workflow-level1.component.scss'],
})
export class WorkflowLevel1Component implements OnInit {
  public tableOptions: any;

  public graphQlQuery: any;

  ngOnInit() {
    this.defineTableOptions();
  }

  private defineTableOptions() {
    this.tableOptions = {
      columns: [
        {
          name: 'Name', prop: 'name', flex: 2, sortable: true, filtering: true,
        },
        {
          name: 'Type', prop: 'type', flex: 2, sortable: true,
        },
        {
          name: 'Date Created', prop: 'create_date', index: 1, flex: 1, cellTemplate: 'date', sortable: true,
        },
      ],
    };

    this.graphQlQuery = `
        {
          workflowlevel1s {
            id
            name
            workflowlevel2 {
              id
              name
            }
          }
        }
      `;
  }
}
