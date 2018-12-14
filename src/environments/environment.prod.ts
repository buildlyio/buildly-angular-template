export const environment = {
  API_URL: (process as any).env.API_BASE_URL,
  DOCS_API: (process as any).env.DOCS_API,
  OAUTH_CLIENT_ID: (process as any).env.OAUTH_CLIENT_ID,
  OAUTH_TOKEN_URL:  (process as any).env.OAUTH_TOKEN_URL,
  production: true
};
