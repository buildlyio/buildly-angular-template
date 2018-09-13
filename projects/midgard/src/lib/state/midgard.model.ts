import { WorkflowLevel1 } from '@libs/midgard/src/lib/pages/workflow-level1/state/workflow-level1.model';
import { WorkflowLevel2 } from '@libs/midgard/src/lib/pages/workflow-level2/state/workflow-level2.model';

export interface MidgardState {
  workflowLevel1: WorkflowLevel1[];
  workflowLevel2: WorkflowLevel2[];
  dataLoaded: boolean;
}
