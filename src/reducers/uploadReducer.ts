import actionTypes from "../constants/actionTypes";
import {
  PostUploadAttachmentAction,
  PostUploadAttchmentState,
} from "../types/uploadType";

const initialUploadAttachmentState: PostUploadAttchmentState = {
  pending: false,
  data: {},
  error: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state = initialUploadAttachmentState,
  action: PostUploadAttachmentAction
) => {
  switch (action.type) {
    case actionTypes.POST_UPLOAD_FILE_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.POST_UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.payload.data,
        error: null,
      };
    case actionTypes.POST_UPLOAD_FILE_FAILURE:
      return {
        ...state,
        pending: false,
        data: "",
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
