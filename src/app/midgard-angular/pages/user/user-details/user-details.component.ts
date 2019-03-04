import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@libs/midgard-angular/src/lib/modules/store/store';
import { getAllWorkflowLevel1s } from '@libs/midgard-angular/src/lib/state/workflow-level1/workflow-level1.selectors';
import { map } from 'rxjs/internal/operators';
import { Subscription } from 'rxjs';
import { loadWorkflowLevel1Data } from '@libs/midgard-angular/src/lib/state/workflow-level1/workflow-level1.actions';
import {
  createWorflowTeam, deleteWorflowTeam, loadWorflowTeams,
  updateWorflowTeam
} from '@libs/midgard-angular/src/lib/state/workflow-team/workflow-team.actions';
import {ActivatedRoute, Router} from '@angular/router';
import { getWorkflowTeamsByUser } from '@libs/midgard-angular/src/lib/state/workflow-team/workflow-team.selectors';
import { MatSnackBar } from '@angular/material';
import {getCoreUser} from '../../../state/coreuser/coreuser.selectors';

@Component({
  selector: 'mg-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  columns = [] ;
  rows = [];
  tableOptions;
  workflowLevel1Options = [];
  currentUserId;
  currentCoreUser;
  private workflowOptionsSubscription: Subscription;
  private workflowTeamSubscription: Subscription;

  constructor(
    private store: Store<any>,
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getWorkflowOptions();
    this.getUserWorkflowTeams();
    this.getUser();
  }

  /**
   * get the workflowlevel1 dropdown options
   */
  getWorkflowOptions() {
    this.store.dispatch(loadWorkflowLevel1Data());
    this.workflowOptionsSubscription = this.store.observable.pipe(
      select(getAllWorkflowLevel1s),
      map((reducer: any) => reducer.data)
    ).subscribe(data => {
      this.workflowLevel1Options = data.map(workflow => {
        return {
          value : workflow.id,
          label: workflow.name,
        };
      });
      this.defineTableOptions();
    });
  }

  /**
   * gets the user's permissions(workflowteams)
   */
  getUserWorkflowTeams() {
    this.currentUserId = this.route.snapshot.paramMap.get('id');
    this.workflowTeamSubscription = this.store.observable.pipe(
      select(getWorkflowTeamsByUser(this.currentUserId)),
    ).subscribe(data => {
      this.rows = this.getWorkflowTeamsWithWorkflowLabels(data);
    });
    this.store.dispatch(loadWorflowTeams());
  }

  /**
   * get current core user from the store depending on the route paramete
   */
  getUser() {
    this.workflowTeamSubscription = this.store.observable.pipe(
      select(getCoreUser(this.currentUserId)),
    ).subscribe(data => {
      this.currentCoreUser = data;
    });
  }

  /**
   * change the role of the user in a workflow
   * @param item
   */
  changeRole(item) {
    const workflowTeam = {
      id: item.row.id,
      role: Number(item.selectedItem.value)
    };
    this.store.dispatch(updateWorflowTeam(workflowTeam));

  }

  /**
   * get workflowTeams with workflowLevel1 labels
   * @param {any[]} workflowTeams
   */
  getWorkflowTeamsWithWorkflowLabels(workflowTeams: any[]) {
    return workflowTeams.map(workflowTeam => {
      this.workflowLevel1Options.forEach( workflowLevel1 => {
        if (workflowLevel1.value === workflowTeam.workflowlevel1) {
          workflowTeam.workflowLabel = workflowLevel1.label;
          // remove the workflowlevel1 from dropdown options if it has permissions already (there is a row for it)
          const workflowIndex = this.workflowLevel1Options.indexOf(workflowLevel1);
          this.workflowLevel1Options.splice(workflowIndex, 1);
        }
      });
      return workflowTeam;
    });
  }

  /**
   * add permissions to workflow to the current user
   * @param item
   */
  addWorkflow(item) {
    const workflowTeam = {
      workflow_user: this.currentUserId,
      workflowlevel1: item.value
    };
    this.store.dispatch(createWorflowTeam(workflowTeam));
  }

  /**
   * delete permissions from a workflow to the current user
   * @param item
   */
  deleteWorkflow(row) {
    this.store.dispatch(deleteWorflowTeam(row.item));
    this.snackBar.open('Permissions has been deleted', 'Ok', {
      duration: 2000,
    });
  }

  /**
   * checks if the form for inviting a user should be shown
   * @returns {boolean}
   */
  isUserInviteCheck(): boolean {
    const routeParam = this.activatedRoute.snapshot.paramMap.get('id');
    let isUserInvite;
    if (routeParam === 'new') {
      isUserInvite = true;
    } else {
      isUserInvite = false;
    }
    return isUserInvite;
  }

  /**
   * defines the table options
   */
  private defineTableOptions() {
    this.tableOptions = {
      columns: [
        {name: 'Workflow', prop: 'workflowLabel', flex: 2, sortable: true, filtering: true},
        {name: 'Permissions', prop: 'role', defaultOptionIndex: '2', cellTemplate: 'switcher', flex: 3, switcherOptions: [{value: '2', label: 'readonly'}, {value: '3', label: 'write'}, {value: '1', label: 'admin'}]},
        {name: '', flex: 1, cellTemplate: 'actions', actions: ['delete']},
      ],
      fixedRow: {
        label : 'Add permissions to a Workflow Level 1',
        noOptionsMessage: 'No Workflows available',
        type: 'select',
        options: this.workflowLevel1Options
      }
    };
  }

  /**
   * navigates to the users page
   */
  goToUsersPage() {
    this.router.navigate([`/user/list`]);
  }

  ngOnDestroy() {
    this.workflowOptionsSubscription.unsubscribe();
    this.workflowTeamSubscription.unsubscribe();
  }
}
