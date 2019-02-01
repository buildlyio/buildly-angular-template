// This will allow you to load `.json` files from disk
declare module '*.json' {
  const value: any;
  export default value;
}
