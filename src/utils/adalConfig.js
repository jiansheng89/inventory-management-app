import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';
 
export const adalConfig = {
  tenant: '26d9f0f4-805a-440d-9a8e-dcfd349601c4',
  clientId: 'f724c9b1-e621-475a-a6de-cc884ca38b01',
  endpoints: {
    api: 'f724c9b1-e621-475a-a6de-cc884ca38b01',
  },
  cacheLocation: 'localStorage',
};
 
export const authContext = new AuthenticationContext(adalConfig);
 
export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);
 
export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);