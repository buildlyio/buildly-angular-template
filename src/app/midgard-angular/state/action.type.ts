export interface Action {
  type: string;
  data?: any;
  id?: string;
  nested?: string;
  index?: number;
}
