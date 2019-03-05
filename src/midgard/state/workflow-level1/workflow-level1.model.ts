export interface WorkflowLevel1 {
  id: number;
  name: string;
  url?: string;
  budget?: string;
  funding_status?: string;
  cost_center?: string;
  description?: string;
  public_dashboard?: boolean;
  country?: Array<string>;
  sector?: Array<string>;
  status?: string;
  workflow_key?: string;
  sort?: number;
  organization?: string;
  portfolio?: string;
  fund_code?:  Array<any>;
  award?:  Array<any>;
  sub_sector?:  Array<any>;
  milestone?:  Array<any>;
  user_access?: Array<any>;
  start_date?: string;
  end_date?: string;
  localId?: any;
  permissions?: object;
  level1_uuid?: string;
}
