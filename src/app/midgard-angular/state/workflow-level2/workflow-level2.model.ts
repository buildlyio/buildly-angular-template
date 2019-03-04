export interface WorkflowLevel2 {
  id?: number;
  description?: string;
  level2_uuid?: string;
  name: string;
  notes?: string;
  parent_workflowlevel2?: number;
  short_name?: string;
  create_date?: string;
  edit_date?: string;
  milestone?: number;
  workflowlevel1?: string;
  created_by?: string;
}
