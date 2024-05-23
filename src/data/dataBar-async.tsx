import { getTest } from "../selectors/selectors";
import { useSelector } from "react-redux";
import moment from "moment";
import styles from "../components/dataBar/dataBar.module.scss";
import sections from "../assets/Images/sections-icon.svg";
import call from "../assets/Images/call.svg";
import clock from "../assets/Images/clock.svg";
import record from "../assets/Images/record.svg";
import calender from "../assets/Images/calender.svg";
import exam from "../assets/Images/exam.svg";
import email from "../assets/Images/email.svg";

import constants from "../constants/constants";
const { PROGRESSBAR_KEY } = constants;
const useFetch = () => {
  const testDetails = useSelector(getTest);
  const formatMinutes = (time: any) => {
    let days: number = Math.floor(time / 24 / 60);
    let hours: number = Math.floor((time / 60) % 24);
    let minutes: number = Math.floor(time % 60);
    return `${days > 0 ? days + " day " : ""}${
      hours > 0 ? hours + " hours " : ""
    }${minutes > 0 ? minutes + " minutes" : ""}`;
  };
  let local_start_date: any = moment.utc(testDetails?.start_time).local();
  let local_end_date: any = moment.utc(testDetails?.end_time).local();
  let get_zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const getDates = (date: string) => {
    return moment(date).format(" Do MMMM YYYY");
  };
  const getTime = (time: string) => {
    return moment(time).format(" h:mm a");
  };

  const duration = formatMinutes(testDetails?.duration);
  let currentTimeStamp = moment().toISOString();

  let tomorrow = moment(currentTimeStamp).add(1, "days");
  const dataBarData = {
    title: "",
    subTitle: "",
    total: testDetails?.problems_total,
    section_count: testDetails?.section_count,
    completed: 2,
    startDate: getDates(
      testDetails?.start_time === null ? currentTimeStamp : local_start_date
    ),
    startTime: getTime(
      testDetails?.start_time === null ? currentTimeStamp : local_start_date
    ),
    endDate: getDates(
      testDetails?.end_time === null ? tomorrow : local_end_date
    ),
    endTime: getTime(
      testDetails?.end_time === null ? tomorrow : local_end_date
    ),
    examName: testDetails?.name,
    examType: "By " + testDetails?.company?.name,
    timeToComplete: duration,
  };
  let clientEmail = testDetails && testDetails?.settings?.support?.email;
  let clientPhone = testDetails && testDetails?.settings?.support?.phone;
  const dataBarContent = [
    {
      id: 1,
      data: [
        {
          id: "1",
          image:
            testDetails?.company?.avatar_url !== null
              ? testDetails?.company?.avatar_url
              : exam,
          alt: "exam",
          title: dataBarData.examName,
          subTitle: dataBarData.examType,
        },
      ],
    },
    {
      id: 2,
      data: [
        {
          id: "1",
          image:
            testDetails?.company?.avatar_url !== null
              ? testDetails?.company?.avatar_url
              : exam,
          alt: "exam",
          title: dataBarData.examName,
          subTitle: dataBarData.examType,
        },
        {
          id: "2",
          type: PROGRESSBAR_KEY,
          total: dataBarData.total,
          completed: dataBarData.completed,
        },
      ],
    },
    {
      id: 3,
      data: [
        {
          id: "1",
          image: clock,
          alt: "clock",
          title: duration,
          subTitle: `To take this ${testDetails?.test_type_verbose}`,
        },
        {
          id: "2",
          image: record,
          alt: "record",
          title: dataBarData.total,
          subTitle: "Problems to be solved",
        },
        {
          id: "4",
          className:
            dataBarData.section_count === 1 ? styles.hide_databar_content : "",
          image:
            dataBarData.section_count === 1
              ? styles.hide_databar_content
              : sections,
          alt:
            dataBarData.section_count === 1
              ? styles.hide_databar_content
              : "sections",
          title:
            dataBarData.section_count === 1 ? "" : dataBarData.section_count,
          subTitle:
            dataBarData.section_count === 1 ? "" : "Sections to be solved",
        },
        {
          id: "3",
          image: calender,
          alt: "calender",
          title: "",
          subTitle: "",
          values: [
            {
              title: `Starts :${dataBarData.startDate}`,
              subTitle: `${dataBarData.startTime} `,
            },
            {
              title: `Ends  :${dataBarData.endDate}`,
              subTitle: dataBarData.endTime,
            },
          ],
        },
      ],
    },
    {
      id: 4,
      alignLeft: true,
      title: "Support",
      actionButton: "Go back to Assessment",
      data: [
        {
          id: "1",
          image: email,
          alt: "email",
          className: styles.email_class,
          title: clientEmail ? clientEmail : "support@doselect",
          subTitle: "support - Email",
        },
        {
          id: "2",
          image: call,
          alt: "call",
          className: styles.email_class,
          title: clientPhone ? clientPhone : "+91 080-47106630",
          subTitle: "support - Phone",
        },
      ],
    },
    // {
    //   id: 5,
    //   title: "Clients Support",
    //   alignLeft: true,
    //   data: [
    //     {
    //       id: "1",
    //       image: clientemail,
    //       alt: "clientemail",
    //       title: "support@companyname.com",
    //       subTitle: "Client support - Email"
    //     },
    //     {
    //       id: "2",
    //       image: clientcall,
    //       alt: "clientcall",
    //       title: "+91 080-89955678",
    //       subTitle: "Client support - Phone"
    //     }
    //   ]
    // }
  ];
  return dataBarContent;
};
export default useFetch;
