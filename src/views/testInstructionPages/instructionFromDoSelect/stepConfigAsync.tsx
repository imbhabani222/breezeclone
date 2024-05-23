import { useSelector } from "react-redux";
import SystemCheck from "../doSelectSystemCheck/doSelectSystemCheck";
import IdentityCheck from "../doSelectSystemCheck/doSelectIdentityCheck";
import Declaration from "../doSelectSystemCheck/doSelectDeclaration";
import instructionDetails from "../../../constants/instructionConstant";

import collapsableData from "../../../data/doSelectInstructions.json";
import CardCollapse from "../../../components/collapse/CardCollapse";
import { getcheckAction, getTest } from "../../../selectors/selectors";
import { stringFiller } from "../../../data/utils";
import purifyInnerHtml from "../../../utils/innerHTML";

const {
  STEPS_TITLE_1,
  STEPS_TITLE_2,
  STEPS_TITLE_3,
  DECLARATION,
  INSTRUCTION,
  SYSTEM_CHECK,
} = instructionDetails;

const useStepConfig = () => {
  const testDetails = useSelector(getTest);
  const checkActionData: any = useSelector(getcheckAction);
  const proctorData = {
    proctor: testDetails?.settings?.proctor.enabled,
    videoProctor: testDetails?.settings?.proctor.video.enabled,
    imageProctor: testDetails?.settings?.proctor.snapshot,
  };
  const toggleContent: any = [];
  if (proctorData.videoProctor || proctorData.imageProctor) {
    toggleContent.push(<IdentityCheck />);
  } else {
    toggleContent.push(<Declaration />);
  }
  const type = testDetails?.test_type_verbose;
  const steps = [
    {
      title: STEPS_TITLE_1,
      subTitle: INSTRUCTION,
      content: collapsableData.map((data, index) => (
        // return (
        //   <>
        <CardCollapse
          question={
            <div> {purifyInnerHtml(stringFiller(data.question, { type }))}</div>
          }
          index={index}
          key={index}
          answer={
            <div>{purifyInnerHtml(stringFiller(data.answer, { type }))}</div>
          }
        />
        //   </>
        // );
      )),
    },
    {
      title: STEPS_TITLE_2,
      subTitle: SYSTEM_CHECK,
      content: <SystemCheck {...proctorData} />,
    },
    {
      title:
        proctorData.videoProctor || proctorData.imageProctor
          ? STEPS_TITLE_3
          : DECLARATION,
      subTitle:
        proctorData.videoProctor || proctorData.imageProctor
          ? STEPS_TITLE_3
          : DECLARATION,
      content: toggleContent,
    },
  ];
  return steps;
};
export default useStepConfig;
