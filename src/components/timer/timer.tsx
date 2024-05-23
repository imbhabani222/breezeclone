import React, {
  useEffect,
  useState,
  useCallback,
  FunctionComponent,
} from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { Typography } from "antd";

import styles from "./timer.module.scss";

import {
  getAllSolvedIds,
  getDuration,
  getDurationLeft,
  getTimeDiff,
  getTimeLeft,
  stringFiller,
} from "../../data/utils";
import FormatData from "../markedData/markedData";
import Data from "../../data/counter.json";
import messages from "../../constants/messages";
import markedData from "../../constants/timerData";
import { fetchAssessmentDetails } from "../../actions/assessmentActions";
import { getServerTimeSelector } from "../../selectors/serverTimeSelector";
import {
  getProblemSelector,
  getSolutionSetSelector,
  getStatusCodeSolutionSetSelector,
} from "../../selectors/problemSelector";
import moment from "moment";
import { systemAction } from "../../actions/systemActions";
import { checkAction } from "../../actions/actions";
import { useLocation, useNavigate } from "react-router-dom";
import {
  finishTestRequest,
  postSectionRequest,
} from "../../actions/problemActions";
import { getcheckAction, getIdentity } from "../../selectors/selectors";
import constants from "../../constants/constants";
import {
  autoRedirectModalToNext,
  autoRedirectToSection,
  getSubmitConformationModal,
} from "../../constants/modals";
import BreezeModal from "../../components/modal/modal";

const { TIME_LABEL_TWO } = markedData;
const { showWarningAtSec } = Data;

const { TIMER } = messages;
const {
  ROUTE: { TEST_SECTION_SUBMIT, FEEDBACK },
} = constants;
type TimerProps = {
  fetchAssessmentDetails: Function;
  timeDiff: number;
  testDetails: any;
  solutionSet: any;
};
const Timer: FunctionComponent<TimerProps> = ({
  fetchAssessmentDetails,
  timeDiff,
  solutionSet,
  testDetails,
}) => {
  const dispatch = useDispatch();
  const solution_set_status = useSelector(getStatusCodeSolutionSetSelector);
  const server_time = useSelector(getServerTimeSelector);
  const solution_set = useSelector(getSolutionSetSelector);
  const checkActionSelector: any = useSelector(getcheckAction);
  const problems = useSelector(getProblemSelector);
  const identityData: any = useSelector(getIdentity);
  const [showWarning, setWarning] = useState(false);
  const [duration, setDuration] = useState(moment.duration());
  const [timeLeft, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [sectionSlug, setSection] = useState("");
  const [isTimedSection, setTimeCondition] = useState(false);
  const [checkLastCTK, setLastCheckStatus] = useState(false);
  const [nextSecModal, setNextSecModalStatus] = useState(false);
  let [visible_modal, setVisible] = useState(false);

  const navigate = useNavigate();
  let location = useLocation();

  const slug = location.pathname.split("/")[2];

  useEffect(() => {
    if (solutionSet && server_time && testDetails) {
      const { is_timed_section, duration: testDuration } = testDetails;
      if (!is_timed_section) {
        setTimeCondition(false);
        const { start_time } = solutionSet;
        const test_start_time = moment(new Date(start_time));
        const diff = getTimeDiff(test_start_time);
        dispatch(
          checkAction({
            duration: testDuration,
            start_time: test_start_time,
          })
        );
        const _duration: any = getTimeLeft(
          diff,
          testDuration,
          (timerExpired: boolean) => {
            if (timerExpired) {
              setDuration(moment.duration());
              // Logic to submit assessment
            }
          }
        );
        // console.log(_duration);

        if (_duration) {
          setDuration(_duration);
        } else {
          setDuration(moment.duration());
        }
      } else {
        setTimeCondition(true);
        const { sections } = solution_set;
        const currentSection =
          sections.filter((item: any) => item.status === "CTK")[0] || undefined;
        if (currentSection) {
          const { start_time, duration, slug } = currentSection;
          // console.log(slug, sectionSlug);
          const diff = getTimeDiff(new Date(start_time));
          const offset = moment(server_time).utcOffset();
          const _test_start_time = moment(
            new Date(
              new Date(testDetails.test_start_time).getTime() + offset * 60000
            )
          );
          if (slug !== sectionSlug) {
            const ctkStatus = sections.filter(
              (item: any) => item.status === "CTK" || item.status === "SUB"
            ).length;
            if (ctkStatus === sections.length) {
              setLastCheckStatus(true);
            }
            const leftDuration =
              testDetails.duration -
              sections
                .filter((item: any) => item.status === "SUB")
                .map((item: any) => item.duration)
                .reduce((a: number, b: number) => {
                  return a + b;
                }, 0);
            setTimeout(() => {
              dispatch(
                checkAction({
                  currentSection: slug,
                  section_duration: duration,
                  section_start_time: moment(start_time),
                  duration: leftDuration,
                  start_time: moment(start_time),
                })
              );
            }, 5000);

            setSection(slug);
            const _duration: any = getTimeLeft(
              diff,
              duration,
              (timerExpired: boolean) => {
                if (timerExpired) {
                  setDuration(moment.duration());
                  // Logic to submit section
                }
              }
            );
            if (_duration) {
              setDuration(_duration);
            } else {
              setDuration(moment.duration());
            }
          }
        }
      }
    }
    return () => {
      // console.log("close");
    };
  }, [server_time, solution_set, dispatch, sectionSlug, testDetails]);
  const { sections } = solution_set;
  const getIndex = sections?.findIndex((data: any) => data?.status === "CTK");
  useEffect(() => {
    let interval: any;
    const _duration = duration;
    setTime({
      hours: _duration.hours(),
      minutes: _duration.minutes(),
      seconds: _duration.seconds(),
    });
    interval = setInterval(() => {
      if (_duration && _duration.valueOf() > 0) {
        _duration.subtract(1, "second");
        setTime({
          hours: _duration.hours(),
          minutes: _duration.minutes(),
          seconds: _duration.seconds(),
        });
      } else {
        setTime({ hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
        if (isTimedSection && !checkLastCTK) {
          // submit section
          setNextSecModalStatus(true);
          setVisible(true);
          setTimeout(() => {
            let payload = {
              solutionset_id: solution_set.id,
              section_slug: sectionSlug,
              force_submission: false,
            };
            localStorage.setItem("BrowserTcount", "0");
            setVisible(false);
            dispatch(postSectionRequest("PLT", identityData.username, payload));
            navigate(TEST_SECTION_SUBMIT.replace(":slug", slug));
          }, 5000);

          console.log("Navigate");
        } else {
          // submit assessment
          if (solution_set_status === 200) {
            setVisible(true);
            // navigateToFeedBack();
            setTimeout(() => {
              localStorage.setItem("BrowserTcount", "0");
              navigate(FEEDBACK.replace(":slug", slug));
              dispatch(checkAction({ startTimer: false, duration: 0 }));
              setVisible(false);
            }, 5000);
            // console.log("submit Assessment");
          }
        }
      }
    }, 1000);
    return () => {
      // console.log("Close 3");
      clearInterval(interval);
    };
  }, [duration]);

  //console.log(solution_set_status);
  const goToNextSection = () => {
    let payload = {
      solutionset_id: solution_set.id,
      section_slug: sectionSlug,
      force_submission: false,
    };
    setVisible(false);
    dispatch(postSectionRequest("PLT", identityData.username, payload));
    navigate(TEST_SECTION_SUBMIT.replace(":slug", slug));
  };
  const navigateToFeedBack = () => {
    localStorage.setItem("BrowserTcount", "0");
    dispatch(checkAction({ startTimer: false, duration: 0 }));
    dispatch(finishTestRequest(solution_set.id, identityData.username));
    navigate(FEEDBACK.replace(":slug", slug));
    setVisible(false);
  };
  let SectionTotal: number = 0,
    sectionCompleted: number = 0;

  if (problems.length >= 0) {
    let current =
      problems &&
      problems?.find((val: any) => {
        return val.status === "CTK";
      });
    current &&
      current?.problems.map((val: any) => {
        if (val.solution !== null) {
          sectionCompleted++;
        }
      });
    SectionTotal = current && current.problems.length;
  }

  const currentSection =
    sections.filter((item: any) => item.status === "CTK")[0] || undefined;
  // let each_sec_duration = moment.duration(1422, "minutes");
  const data = autoRedirectToSection({
    text: `Going great .</br></br>This section has been auto-submitted as the allotted time is up.</br>You attempted ${sectionCompleted} out of ${SectionTotal} questions in ${currentSection?.duration} minutes </br>`,
    onOk: goToNextSection,
    timeLeft: getDurationLeft(
      checkActionSelector?.data?.start_time || new Date(),
      checkActionSelector?.data?.duration || 0
    ),
    contentType: true,
  });
  const submitToFeedBack = autoRedirectModalToNext({
    text: `Thank you . </br></br>This section has been auto-submitted as the allotted time is up.</br>You attempted ${sectionCompleted} out of ${SectionTotal} questions in ${currentSection?.duration} minutes </br>`,
    onOk: navigateToFeedBack,
    timeLeft: getDurationLeft(
      checkActionSelector?.data?.start_time || new Date(),
      checkActionSelector?.data?.duration || 0
    ),
    contentType: true,
  });

  let solvedIds: any = getAllSolvedIds(solutionSet);
  const normalTest = autoRedirectModalToNext({
    text: `Thank you . </br></br>This test has been auto-submitted as the allotted time is up.</br>You attempted ${solvedIds?.length} out of ${problems[0]?.problems?.length} questions in ${testDetails?.duration} minutes </br>`,
    onOk: navigateToFeedBack,
    timeLeft: getDurationLeft(
      checkActionSelector?.data?.start_time || new Date(),
      checkActionSelector?.data?.duration || 0
    ),
    contentType: true,
  });
  return (
    <div title={TIMER}>
      <div className={styles.main_timerWrapper}>
        <BreezeModal
          width={720}
          modalData={
            isTimedSection
              ? getIndex + 1 === sections.length
                ? submitToFeedBack
                : data
              : normalTest
          }
          visible={visible_modal}
        />

        <FormatData
          className={clsx({
            [styles.warning_mode]: showWarning,
          })}
          formatData={stringFiller(TIME_LABEL_TWO, timeLeft)}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  timeDiff: state.systemAction.data.timeDiff,
  testDetails: state.testDetails.details,
  solutionSet: state.problem.solutionSetReducer.allProblems,
});
const mapDispatchToProps = {
  fetchAssessmentDetails: (slug: string, username: string) =>
    fetchAssessmentDetails(slug, username),
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Timer));
