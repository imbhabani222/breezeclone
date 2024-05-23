import constants from "../constants/constants";
import messages from "../constants/messages";
import cloneDeep from "lodash/cloneDeep";
import axios from "./axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const csrfToken = cookies.get("doselectcsrf");
axios.defaults.headers.common["X-CSRFToken"] = csrfToken;

const needsPayload = {
  POST: true,
  PUT: true,
  PATCH: true,
  DELETE: true,
  GET: true,
};

const SUCCESS_STATUS_CODES = {
  200: true,
  201: true,
  202: true,
  204: true,
};

export class FetchWithCaching {
  static getFromCache(key) {
    const item = FetchWithCaching.cache[key];

    if (item) {
      if (item.expireTime < new Date().getTime()) {
        console.warn("Deleting expired cache item");
        delete FetchWithCaching.cache[key];
      } else {
        console.warn("Item found in cache");

        return item.resData;
      }
    }
  }

  static insertToCache(obj, key, cacheExpireDuration) {
    obj.expireTime = new Date().getTime() + cacheExpireDuration;
    this.cache[key] = obj;
  }

  /* eslint-disable max-params */
  static fetchApi(
    url,
    reqParams = {},
    method = constants.HTTP_METHODS.GET,
    reqHeaders = constants.HTTP_REQ_DEFAULT_HEADERS,
    setAuthorizationInHeader = true,
    cacheResponse = true,
    cacheExpireDuration = 30 * 60000, // In milliseconds
    isMultiPart = false,
    withCredentials = true,
    cache = true,
    sendStatus = false
  ) {
    return new Promise((resolve, reject) => {
      const { authToken } = reqParams;

      delete reqParams.authToken;

      const paramsStr = reqParams;
      const cacheKey = `${paramsStr}${url}`;

      const data = FetchWithCaching.getFromCache(cacheKey);

      if (data && cacheResponse && !isMultiPart && cache) {
        resolve(cloneDeep(data));
      } else {
        let payload = {};

        if (needsPayload[method]) {
          payload = { data: isMultiPart ? reqParams.data : paramsStr };
        }

        const headers = { ...reqHeaders };
        if (setAuthorizationInHeader) {
          headers.Authorization = `Bearer ${authToken}`;
        }
        axios({
          url,
          method,
          ...payload,
          withCredentials,
          ...{ clearCacheEntry: !cache },
        }).then(
          (res) => {
            const { status, data: responseData } = res;
            if (SUCCESS_STATUS_CODES[status]) {
              if (cacheResponse && !isMultiPart && cache) {
                FetchWithCaching.insertToCache(
                  { resData: cloneDeep(responseData) },
                  cacheKey,
                  cacheExpireDuration
                );
              }
              if (sendStatus) {
                resolve(
                  { status, data: responseData } || { message: "Success" }
                );
              } else {
                resolve(responseData || { message: "Success" });
              }
            } else {
              reject(
                constants.HTTP_REQ_ERROR_MAP[status] || {
                  status,
                  message:
                    responseData.error.message ||
                    messages.DEFAULT_ERROR_MESSAGE,
                }
              );
            }
          },
          (error) => {
            const errorData = (error.response && error.response.data) ||
              (error.toJSON && error.toJSON()) || {
                status: 404,
                message: messages.DEFAULT_ERROR_MESSAGE,
              };

            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              ...errorData,
            });
          }
        );
      }
    });
  }
}

FetchWithCaching.cache = {};
