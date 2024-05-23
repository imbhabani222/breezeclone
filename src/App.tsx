import React, { Suspense, useContext, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "offline-js";

import "antd/dist/antd.css";
import "highlight.js/styles/atom-one-dark.css";
import "katex/dist/katex.min.css";

import "react-split-pane/lib/SplitPane";

import "./commonStyles/offlineTheme.scss";

import constants from "./constants/constants";

import MainLayout from "./views/MainLayout/MainLayout";
import {
  fetchIdentityActions,
  fetchAssessmentDetails,
  fetchTechnologiesDetails,
} from "./actions/assessmentActions";
import {
  fetchHackerActions,
  fetchRecruiterActions,
  fetchUserTypeActions,
} from "./actions/candidateActions";
import { checkAction } from "./actions/actions";

import {
  fetchLanguageRequest,
  runCodeWithCustomInputRequest,
} from "./actions/codingActions";
import {
  fetchLanguageSelector,
  getIdentity,
  getIdentityPending,
  getsolutionSet,
  getsolutionSetError,
  getTest,
  getTestStartDetails,
} from "./selectors/selectors";
import { fetchGetServerTimeRequest } from "./actions/getServerActions";
import {
  fetchProblemRequest,
  fetchSolutionSetRequest,
} from "./actions/problemActions";
import _ from "lodash";
import {
  getSolutionSetSelector,
  getStatusCodeSolutionSetSelector,
} from "./selectors/problemSelector";
import { WebSocketContext } from "./utils/socket";

const LandingPage = React.lazy(
  () =>
    import("./views/testInstructionPages/landingAndAssessment/testLandingPage")
);
const Instruction = React.lazy(
  () =>
    import(
      "./views/testInstructionPages/landingAndAssessment/assessmentInstruction"
    )
);
const DoSelectInstructions = React.lazy(
  () =>
    import(
      "./views/testInstructionPages/instructionFromDoSelect/instructionFromDoSelect"
    )
);
const TestSubmitSectionPage = React.lazy(
  () =>
    import("./views/testInstructionPages/testQuestionsPage/testQuestionsPage")
);
const Faq = React.lazy(() => import("./views/Faq/Faq"));
const Feedback = React.lazy(() => import("./views/Feedback/Feedback"));
const TestCompleted = React.lazy(
  () => import("./views/TestComplete/TestComplete")
);
const Footer = React.lazy(() => import("./components/footer/footer"));
const RichTextEditor = React.lazy(
  () => import("./views/Subjective/subjective")
);
const FillInTheBlanks = React.lazy(
  () => import("./views/FillInTheBlanks/FillInTheBlanks")
);

const MCQ = React.lazy(() => import("./views/MCQPage/MCQ"));
const SwitchPath = React.lazy(() => import("./views/testSwitch/testSwitch"));
// const SwitchPath = React.lazy(() => import("./utils/question-type-path"));

const {
  ROUTE: {
    LANDING_PAGE,
    INSTRUCTION_PAGE,
    DOSELECT_INSTRUCTION,
    TEST_SECTION_SUBMIT,
    FAQ,
    FEEDBACK,
    TESTCOMPLETE,
    RICH_TEXT_EDITOR,
    FIll_IN_BLANKS,
    MCQ_PAGE,
    SWITCH_PATH,
  },
} = constants;

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const identityDetails: any = useSelector(getIdentity);
  const identityPending: any = useSelector(getIdentityPending);
  const testStartDetails: any = useSelector(getTestStartDetails);
  const solutionSet = useSelector(getSolutionSetSelector);
  const solSetStatus = useSelector(getStatusCodeSolutionSetSelector);
  const ws: any = useContext(WebSocketContext);

  const getlang: any = useSelector(fetchLanguageSelector);
  // console.log(getlang, "lang");

  const testDetails = useSelector(getTest);

  const getProblems = testDetails?.sections?.map((val: any) => val.problems);

  const getCodingQuestions =
    getProblems &&
    getProblems[0] &&
    getProblems[0].some((val: any) => val.problem_type === "SCR");

  const slug: any = location.pathname.split("/")[2];
  const username: string = searchParams.get("username") || "";

  useEffect(() => {
    // dispatch(fetchTechnologiesDetails());
    const _window: any = window;
    if (!_window.firebolt) {
      const onLoad = () => {
        console.log("Editor library downloaded successfully ");
      };
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://assets.central.dev.sg1.chsh.in/firebolt/v1/firebolt.js";
      script.async = true;
      script.addEventListener("load", onLoad);
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    window.onbeforeunload = null;
    dispatch(fetchIdentityActions());
    dispatch(fetchGetServerTimeRequest());
    dispatch(fetchAssessmentDetails(slug, username));

    if (!identityPending && identityDetails.usertype) {
      dispatch(
        fetchUserTypeActions(
          identityDetails.usertype,
          identityDetails.user_id,
          identityDetails.username
        )
      );
    }

    if (getCodingQuestions) {
      console.log("get Technology api for only SCR types");
      dispatch(fetchTechnologiesDetails());
    }
  }, [
    dispatch,
    slug,
    username,
    identityPending,
    identityDetails.usertype,
    identityDetails.user_id,
    identityDetails.username,
    getCodingQuestions,
  ]);

  useEffect(() => {
    if (
      testStartDetails.state === "start" ||
      testDetails.session_state === "ACTIVE" ||
      testDetails.session_state === "START"
    ) {
      dispatch(fetchSolutionSetRequest(testDetails?.id));
    }
  }, [dispatch, testStartDetails, testDetails]);

  useEffect(() => {
    if (solSetStatus === 200) dispatch(checkAction({ startTimer: true }));
  }, [dispatch, solSetStatus]);

  console.log(ws);

  // useEffect(() => {
  //   if (ws?.socket && solutionSet?.id) {
  //     console.log("PROCTOR INT SUCCESS");
  //     ws?.fingerPrint();
  //     ws?.validateSession();
  //   }
  // }, [solSetStatus, solutionSet?.id, ws]);
  return (
    <MainLayout
      component={
        <Suspense fallback={null}>
          <Routes>
            <Route path={INSTRUCTION_PAGE} element={<Instruction />} />
            <Route
              path={DOSELECT_INSTRUCTION}
              element={<DoSelectInstructions />}
            />
            <Route
              path={TEST_SECTION_SUBMIT}
              element={<TestSubmitSectionPage />}
            />
            <Route path={FAQ} element={<Faq />} />
            <Route path={FEEDBACK} element={<Feedback history />} />
            <Route path={TESTCOMPLETE} element={<TestCompleted />} />
            <Route path={SWITCH_PATH} element={<SwitchPath />} />
            <Route path={RICH_TEXT_EDITOR} element={<RichTextEditor />} />

            <Route
              path="*"
              element={
                <Navigate to={INSTRUCTION_PAGE.replace(":slug", slug)} />
              }
            />
          </Routes>
        </Suspense>
      }
    ></MainLayout>
  );
}
export default App;
