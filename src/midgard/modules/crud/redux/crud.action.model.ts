export interface CrudAction {
  type: string;
  /**
   * the endpoint to request
   */
  endpoint?: string;
  /**
   * the id property of the endpoint
   */
  idProp?: string;
  /**
   * property that stores the data
   */
  dataProp?: string;
  /**
   * data returned from the server
   */
  data?: any[];
  /**
   * error returned from the server
   */
  error?: any;
}
