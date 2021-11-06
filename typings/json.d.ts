// This will allow you to load `.json` files from disk
declare module '*.json' {
  const value: any;
  export default value;
}

declare module 'midgard-core' {
  const value: any;
  const redux: any;
  const http: any;
  const Logger: any;
  export default value;
  export { redux, http, Logger };
}
