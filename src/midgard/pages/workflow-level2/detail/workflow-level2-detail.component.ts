import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getAllWorkflowLevel2s } from '@src/midgard/state/workflow-level2/workflow-level2.selectors';

@Component({
  selector: 'mg-workflow-level2-detail',
  templateUrl: './workflow-level2-detail.component.html',
  styleUrls: ['./workflow-level2-detail.component.scss'],
})
export class WorkflowLevel2DetailComponent implements OnInit {
  public formFields: any;

  public graphQlQuery: any;

  public selector: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.selector = getAllWorkflowLevel2s;
    this.defineFormFields();
    this.graphQlQuery = `
      {
        workflowlevel1s {
          id
          name
          workflowlevel2 {
            id
            name
            createDate
         }
        }
      }
    `;
  }

  /**
   * navigate and lazy load the module depending on the select tab
   * @param event - click event on the tab
   */
  navigateToModule(event: any) {
    const moduleName = event.tab.textLabel.toLowerCase();
    const outletsObject: any = {};
    outletsObject[moduleName] = moduleName;
    if (moduleName !== 'details') {
      this.router.navigate([{ outlets: outletsObject }], { relativeTo: this.route });
    } else {
      this.router.navigate(['.'], { relativeTo: this.route });
    }
  }

  /**
   * defines form fields of the detail view
   */
  defineFormFields() {
    this.formFields = [
      {
        label: 'Name', controlName: 'name', type: 'text', validators: ['required'],
      },
      {
        label: 'Description', controlName: 'description', type: 'text', validators: ['required'],
      },
    ];
  }
}
