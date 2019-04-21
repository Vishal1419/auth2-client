export const BASE_URL = 'http://localhost:9000/api';
export const APPLICATION_ID = 'test-client-app-2';
export const CLIENT_ID = 'test-client-id-2';
export const CLIENT_SECRET = 'test-client-secret-2';
export const OAUTH_SERVER_LOGIN_URL = `${BASE_URL}/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${window.location.origin}`;
