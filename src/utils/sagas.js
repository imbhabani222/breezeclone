/* eslint-disable generator-star-spacing */
import { call, put } from "redux-saga/effects";
import constants from "../constants/constants";
import { FetchWithCaching } from "./fetch-with-caching";

export const defaultPayload = {
  url: null,
  params: {},
  successAction: null,
  errorAction: null,
  additionalInfo: {}
};

export const createDispatchObject = (
  actionType,
  result = null,
  additionalInfo = {},
  error = null,
  fetching = false
) => ({
  type: actionType,
  result,
  fetching,
  ...additionalInfo,
  error
});

export function* getDataFromAPI(
  payload = defaultPayload,
  method = "GET", //eslint-disable-line
  headers = constants.HTTP_REQ_DEFAULT_HEADERS,
  setAuthorizationInHeader = true,
  cacheResponse = false,
  cacheExpireDuration = 30 * 60000 /* In milliseconds */,
  isMultiPart = false,
  withCredentials = true
) {
  const { url, successAction, errorAction, additionalInfo, params } = payload;

  try {
    const result = yield call(
      FetchWithCaching.fetchApi,
      url,
      params,
      method,
      headers,
      setAuthorizationInHeader,
      cacheResponse,
      cacheExpireDuration,
      isMultiPart,
      withCredentials
    );

    yield put(createDispatchObject(successAction, result, additionalInfo));
  } catch (error) {
    yield put(createDispatchObject(errorAction, undefined, additionalInfo, error));
  }
}
export function* setAction({ successAction, data }) {
  yield put(createDispatchObject(successAction, data, {}));
}

export const createWatcher = (actionType, workerFn, effect) =>
  function* () {
    yield effect(actionType, workerFn);
  };
