import Cookies from "universal-cookie";
import messages from "./messages";

import { useLocation } from "react-router-dom";
const cookies = new Cookies();
const csrfToken = cookies.get("doselectcsrf");

const constants = {
  HTTP_REQ_DEFAULT_HEADERS: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=UTF-8",
  },
  HTTP_POST_HEADERS: {},
  HTTP_MULTIPART_FORM_HEADERS: {
    "Content-Type": false,
  },
  HTTP_METHODS: {
    POST: "POST",
    GET: "GET",
    DELETE: "DELETE",
    PATCH: "PATCH",
    PUT: "PUT",
  },
  HTTP_REQ_ERROR_MAP: {
    401: { status: 401, message: messages.NOT_AUTHORIZED },
    403: { status: 403, message: messages.ACCESS_DENIED },
    404: { status: 404, message: messages.NO_DATA_AVAILABLE },
  },
  ROUTE: {
    LANDING_PAGE: "/test/:slug/landingPage",
    INSTRUCTION_PAGE: "/test/:slug/instructionPage",
    DOSELECT_INSTRUCTION: "/test/:slug/doSelectInstruction",
    TEST_SECTION_SUBMIT: "/test/:slug/problems",
    FAQ: "/test/:slug/Faqs",
    FEEDBACK: "/test/:slug/Feedback",
    TESTCOMPLETE: "/test/:slug/TestComplete",
    TESTLAYOUT: "/test/:slug/TestLayout",
    RICH_TEXT_EDITOR: "/test/:slug/problems/id",
    FIll_IN_BLANKS: "/tegst/:slug/problems/:id",
    MCQ_PAGE: "/tegst/:slug/problems/:id",
    SWITCH_PATH: "/test/:slug/problems/:id",
  },
  NAME_KEY: "name",
  STATUS_KEY: "status",
  LANGUAGE_KEY: "Language",
  VERSION_KEY: "Version",
  MU_KEY: "Mu",
  TL_KEY: "Tl",
  LA_KEY: "LA",
  DESCRIPTION_KEY: "description",
  DEFAULT_KEY: "default",
  VIDEO_KEY: "video",
  PROGRESSBAR_KEY: "progressbar",
};

export default constants;
