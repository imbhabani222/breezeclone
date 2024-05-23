import actionTypes from "../constants/actionTypes";

export interface PostUploadAttchmentState {
  pending: boolean;
  data: object;
  error: string | null;
}
export interface PostUploadAttchmentRequest {
  type: typeof actionTypes.POST_UPLOAD_FILE_REQUEST;
  platform: string;
  userName: string;
  payload: any;
}

export type PostUploadAttchmentPayload = any;
export type PostUploadAttchmentFailurePayload = any;

export type PostUploadAttchmentSuccess = {
  type: typeof actionTypes.POST_UPLOAD_FILE_SUCCESS;
  payload: { data: any };
};
export type PostUploadAttchmentFailure = {
  type: typeof actionTypes.POST_UPLOAD_FILE_FAILURE;
  payload: { error: any };
};

export type PostUploadAttachmentAction =
  | PostUploadAttchmentRequest
  | PostUploadAttchmentSuccess
  | PostUploadAttchmentFailure;
