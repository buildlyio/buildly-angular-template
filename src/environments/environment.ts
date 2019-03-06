// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  API_URL: 'http://35.195.20.167',
  OAUTH_CLIENT_ID: 'O-dHcab3d3cs2GgL8Yy3DgX9887Vqk1J1sxO3y9N7cH6DTQ7wLGYpk0pg5yRJat19lzP6FQxKvMA7Yb5gvCO5A',
  OAUTH_TOKEN_URL:  'http://35.195.20.167/oauth/token/',
  production: false
};
/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
