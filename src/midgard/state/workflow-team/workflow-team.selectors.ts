
import { reselect } from '@src/midgard/modules/store';
import { WorkflowTeamState } from './workflow-team.reducer';
import {WorkflowTeam} from './workflow-team.model';

const getWorkflowTeams = state => state.workflowTeamReducer;

export const getAllWorkflowTeams = reselect.createSelector(
  getWorkflowTeams,
  (workflowTeamState: WorkflowTeamState) => {
    return workflowTeamState;
  }
);

/**
 * @returns {MemoizedSelector} returning the workflow team of a specific user and add the workflow label
 * @param {string} userId - current user id
 */
export const getWorkflowTeamsByUser = (userId: string) => reselect.createSelector(
  getAllWorkflowTeams,
  (workflowTeamState: WorkflowTeamState) => {
    return workflowTeamState.data.filter( (workflowTeam: WorkflowTeam) => {
      return workflowTeam.workflow_user.toString() === userId;
    });
  });
