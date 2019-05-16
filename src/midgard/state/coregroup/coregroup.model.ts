export interface CoreGroup {
  id?: number;
  uuid?: string;
  name: string;
  is_global: boolean;
  is_org_level: boolean;
  permissions: {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  };
  organization: number;
  workflowlevel1s: string[];
  workflowlevel2s: string[];
}
