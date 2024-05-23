import { createContext, useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  useDispatch,
  // useDispatch,
  useSelector,
} from "react-redux";
// import Cookies from "universal-cookie";

import {
  getcheckAction,
  getIdentity,
  getTestCasesResult,
  getTest,
  // getTestStartDetails,
} from "../selectors/selectors";
import BrowserOSDetails from "../views/testInstructionPages/utilitySystemCheck/browserAndOsDetails";
import { getSolutionSetSelector } from "../selectors/problemSelector";
import { result } from "lodash";
import FingerPrint from "../fingerPrint";
import _isEmpty from "lodash/isEmpty";
import {
  checkAction,
  getCustomResultAction,
  getTestCasesResultAction,
} from "../actions/actions";

import axios from "axios";
import { runCodeWithCustomInputResult } from "../actions/codingActions";
// const cookies = new Cookies();
// const csrfToken = cookies.get("doselectcsrf");

export const WebSocketContext = createContext(null);

const WebSocketProvider = ({ children }: any): any => {
  const dispatch = useDispatch();

  const testDetails: any = useSelector(getTest);
  const solutionSet = useSelector(getSolutionSetSelector);
  const getIdentityDetails: any = useSelector(getIdentity);
  const { id, context_name } = testDetails;
  const { username, usertype } = getIdentityDetails;
  const [socket, setSocket] = useState(null as any);
  const checkActionData: any = useSelector(getcheckAction);

  const testResultData: any = useSelector(getTestCasesResult);

  const testStatus = checkActionData?.data?.startTimer;

  const [_FingerPrint, setFingerPrint] = useState(null as any);
  let ws: any;
  const session = "v242w8oopr6pqg6vd80771awkitqshqo";
  const connectionObject: any = {
    extraHeaders: {},
  };
  const [_callBack, setCallBack] = useState((a: any): any => {
    // console.log(a);
  });
  const assessment_id = solutionSet?.id;
  const assessment_type = context_name;

  connectionObject["query"] = {
    username: username,
    contextKey: "user",
    assessment_type,
    referrer:
      "https://app.central.dev.sg1.chsh.in:3000/test/edwpw/edit/problems",
    assessment_id,
  };

  const getBrowserDetails: any = BrowserOSDetails();

  const onBlurEvent = () => {
    if (socket && assessment_id) {
      socket.emit("BLUR_EVENT", {
        assessmentId: assessment_id,
        assessmentType: "test",
        token: solutionSet?.token,
      });
    }
  };
  const onFocusEvent = () => {
    if (socket && assessment_id) {
      socket.emit("FOCUS_EVENT", {
        assessmentId: assessment_id,
        assessmentType: "test",
        token: solutionSet?.token,
      });
    }
  };
  const fingerPrint = useCallback(() => {
    if (_FingerPrint?.visitorId) {
      const payload = {
        assessmentId: assessment_id,
        assessmentType: context_name,
        metaData: {
          fingerprint: {
            id: _FingerPrint?.visitorId,
            components: {
              browser: `${
                getBrowserDetails?.browser +
                " " +
                getBrowserDetails?.browserVersion
              }`,
            },
          },
        },
        token: solutionSet?.token,
      };
      socket?.emit("PROCTOR_INIT", payload);
    }
  }, [
    _FingerPrint?.visitorId,
    socket,
    context_name,
    assessment_id,
    solutionSet,
    getBrowserDetails,
  ]);
  const validateSession = useCallback(() => {
    if (_FingerPrint?.visitorId) {
      socket.emit("VALIDATE_SESSION", {
        fp: _FingerPrint?.visitorId,
        token: solutionSet?.token,
        sid: assessment_id,
        maxAge: testDetails?.duration * 60,
      });
    }
  }, [
    _FingerPrint?.visitorId,
    assessment_id,
    socket,
    solutionSet?.token,
    testDetails?.duration,
  ]);
  const onData = () => {};
  const fetchSettings = useCallback(() => {}, []);

  useEffect(() => {
    if (socket && assessment_id) {
      socket.emit("BLUR_EVENT", {
        assessmentId: assessment_id,
        assessmentType: "test",
        token: solutionSet?.token,
      });
    }
  }, [assessment_id, id, socket, solutionSet?.token]);

  const codeEvaluated = useCallback(
    (cb) => {
      socket.emit("code-evaluated", cb);
    },
    [socket]
  );

  const codeAsync = useCallback(
    (cb) => {
      socket.emit("code-Async", cb);
    },
    [socket]
  );

  const registerEvent = (callBack: any) => {
    setCallBack(callBack);
  };
  const vidUrl = (data: any) => {
    dispatch(
      checkAction({ signedVideoUrl: null, signedVideoUrlFetched: false })
    );
    socket.emit("VID_URL", data);
  };
  if (!socket && username && usertype && assessment_type && assessment_id) {
    const _socket = io("wss://websocket.central.dev.sg1.chsh.in", {
      // path: `/fetchsettings/${assessment_type}/${assessment_id}`,
      withCredentials: true,
      ...connectionObject,
    });

    _socket.on("code-async", (...args: any) => {
      // console.log("called code asyn", args);
      dispatch(
        getCustomResultAction({ fetching: false, getCodeAsyncData: args })
      );
    });

    _socket.on("code-evaluated", (...args: any) => {
      // dispatch(
      //   getTestCasesResultAction({
      //     fetching: true,
      //     getCodeEvaluatedData: null,
      //   })
      // );
      // if (args?.[0]?.evaluation_status === "completed") {
      dispatch(
        getTestCasesResultAction({
          fetching: false,
          getCodeEvaluatedData: args,
        })
      );
      // }
    });

    _socket.onAny((...args: any) => {
      console.log("ARGS_SOCKET", args);
      if (args[0] === "VID_URL") {
        dispatch(
          checkAction({ signedVideoUrl: args[1], signedVideoUrlFetched: true })
        );
      }
      if (args[0] === "init") {
        dispatch(checkAction({ socketDetails: args[1] }));
      }
      if (_callBack) {
        _callBack(args);
      }
    });
    setSocket(_socket);
  }
  ws = {
    socket: socket,
    onData,
    fetchSettings,
    registerEvent: registerEvent,
    codeEvaluated,
    codeAsync,
    fingerPrint,
    vidUrl,
    validateSession,
    onBlurEvent,
    onFocusEvent,
  };
  useEffect(() => {
    if (FingerPrint) {
      FingerPrint.then((result: any) => {
        setFingerPrint(result);
      });
    }
  }, []);
  useEffect(() => {
    if (assessment_id) {
      const url = `https://websocket.central.dev.sg1.chsh.in/fetchsettings/${assessment_type}/${assessment_id}`;
      const config = {
        withCredentials: true,
      };
      axios.post(url, null, config);
    }
  }, [assessment_id, assessment_type]);
  // useEffect(() => {
  //   if (socket && !_isEmpty(_FingerPrint)) {
  //     socket.emit("VALIDATE_SESSION", {
  //       fp: _FingerPrint?.visitorId,
  //       token: solutionSet?.token,
  //       sid: assessment_id,
  //       maxAge: testDetails?.duration * 60,
  //     });
  //   }
  // }, [
  //   _FingerPrint,
  //   assessment_id,
  //   socket,
  //   solutionSet?.token,
  //   testDetails?.duration,
  // ]);
  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
