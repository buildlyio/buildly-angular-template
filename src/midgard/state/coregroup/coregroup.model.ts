export interface CoreGroup {
  id?: number;
  uuid?: string;
  name: string;
  is_global: boolean;
  is_org_level: boolean;
  permissions: any;
  organization: number;
  workflowlevel1s: string[];
  workflowlevel2s: string[];
}
