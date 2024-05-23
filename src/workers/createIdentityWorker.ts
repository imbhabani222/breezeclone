import axios from "axios";
import { call, put } from "redux-saga/effects";
import Cookies from "universal-cookie";

import {
  createIdentityAction,
  createIdentitySuccess,
  createIdentityFailure,
} from "../actions/createIdentityActions";
import constants from "../constants/constants";
import { FetchWithCaching } from "../utils/fetch-with-caching";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
const cookies = new Cookies();
const csrfToken = cookies.get("doselectcsrf");

const getIdentityImage = (
  assessmentType: any,
  assessmentId: any,
  payload: any
) => {
  const formData = new FormData();
  formData.append("file", payload);
  return axios.post<any>(
    `https://central.dev.sg1.chsh.in/rpc/proctorv2/identity/create/${assessmentType}/${assessmentId}`,
    formData,
    {
      withCredentials: true,
      headers: {
        "X-CSRFToken": csrfToken,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export default function* createIdentityImage({
  assessmentType,
  assessmentId,
  payload,
}: ReturnType<typeof createIdentityAction>): any {
  try {
    const response = yield call<any>(
      getIdentityImage,
      assessmentType,
      assessmentId,
      payload
    );

    yield put(
      createIdentitySuccess({
        payload: {
          data: response?.data,
          statusCode: response?.status,
        },
      })
    );
  } catch (e: any) {
    yield put(
      createIdentityFailure({
        payload: {
          error: e?.response?.status,
          statusCode: e?.response?.status,
        },
      })
    );
  }
}
