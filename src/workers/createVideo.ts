import axios from "axios";
import { call, put } from "redux-saga/effects";
import Cookies from "universal-cookie";

import {
  createVideoAction,
  createVideoSuccess,
  createVideoFailure,
} from "../actions/createVideoActions";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
const cookies = new Cookies();
const csrfToken = cookies.get("doselectcsrf");

const putVideoImages = (signedUrl: any, payload: any) =>
  axios.put<any>(signedUrl, payload, {
    withCredentials: false,
    headers: {
      "Content-Type": "video/webm",
    },
  });

export default function* putVideoImage({
  signedUrl,
  payload,
}: ReturnType<typeof createVideoAction>): any {
  try {
    const response = yield call<any>(putVideoImages, signedUrl, payload);
    const { status } = response;
    yield put(
      createVideoSuccess({
        payload: {
          data: {
            statusCode: status,
          },
        },
      })
    );
  } catch (e: any) {
    console.log(e);
    yield put(
      createVideoFailure({
        payload: {
          error: e?.response?.status,
          statusCode: e?.response?.status,
        },
      })
    );
  }
}
