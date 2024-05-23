import envConfig from "../config/env-urls";
import axiosRetry from "axios-retry";
import { setup } from "axios-cache-adapter";

const REACT_APP_ENV: any = process.env.REACT_APP_ENV || "development";
// console.log(envConfig, REACT_APP_ENV);

const { BaseURL, retryCodes } = envConfig[REACT_APP_ENV].API;

const axios = setup({
  baseURL: BaseURL,
  withCredentials: true,
  cache: {
    maxAge: 15 * 60 * 1000,
    invalidate: async (config: any, request: any) => {
      if (request.clearCacheEntry) {
        // console.log("invalidated ###");

        await config.store.removeItem(config.uuid);
      }
    }
  }
});

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => {
    // console.log(`retry attempt: ${retryCount}`);
    return retryCount * 2000;
  },
  retryCondition: (error) => {
    return retryCodes.includes(error.response?.status || 0);
  }
});
export default axios;
