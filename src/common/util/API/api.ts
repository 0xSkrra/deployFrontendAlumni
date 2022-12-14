import axios, { AxiosRequestHeaders } from "axios";
import keycloak from "../../../keycloak";
import { Paginate } from "../../interface/pagination";

/**
 * Set the Authorization header to be they keycloak Token
 * @param { AxiosRequestHeaders } headers
 * @param { Keycloak } keycloak
 * @returns { import("axios").AxiosRequestHeaders } header
 */
const setAuthorizationHeader = (headers: AxiosRequestHeaders, keycloak: any) => {
  const { token } = keycloak
  return {
    ...headers,
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,    
  };
};
axios.interceptors.response.use( async response => {
  const paginateHeader = response.headers['x-pagination']
  if(paginateHeader){
    const parsed = JSON.parse(paginateHeader)
    let pagination: Paginate = {
      CurrentPage: parsed.CurrentPage,
      ElementCount: parsed.ElementCount,
      PageCount: parsed.PageCount,
      HasPrevious: parsed.HasPrevious,
      HasNext: parsed.HasNext
    }
    response.data = {
      pagination,
      data: response.data
    }
    return response
  }
  return response
}, error => {
  return Promise.reject(error)
})
axios.interceptors.request.use(async (config) => {
    // No keycloak auth exists - Assume public path
    if (!keycloak.authenticated) {
      return config;
    }
  
    if (!keycloak.isTokenExpired()) {
      
      // return config
      return {
        ...config,
        headers: setAuthorizationHeader(config.headers!, keycloak),
        baseURL: process.env.REACT_APP_ALUMNI_URL
      };
    }
  
    // Token is expired, prepare to refresh.
    const HOUR_IN_SECONDS = 3600;
  
    try {
      await keycloak.updateToken(HOUR_IN_SECONDS);
    } catch (error) {
      console.log("Could not refresh Keycloak Token:  Axios Interceptor");
    }

    
    // Return with updated token  
    return {
      ...config,
      headers: setAuthorizationHeader(config.headers!, keycloak),
      baseURL: process.env.REACT_APP_ALUMNI_URL
    };
  });
  
  /** @type { Axios } */
  export default axios;
  