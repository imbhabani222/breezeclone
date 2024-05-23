import network from "../assets/network.svg";
import os from "../assets/os.svg";
import browser from "../assets/browser.svg";
import audio from "../assets/audio.svg";
import webcam from "../assets/webcam.svg";
import mic from "../assets/mic.svg";
export const landingPageArray = [
  {
    headerName:
      "1. The operating system on your computer is one of the 3 mentioned below :",
    array: [
      { title: "Windows 7 and above" },
      { title: "Linux distributions or" },
      { title: "Mac OS X 10.6 and above" },
    ],
  },
  {
    headerName:
      "2. You are opening the assessment in the latest versions of one of the browsers mentioned below :",
    array: [
      { title: "Chrome/ Chromium" },
      { title: "Mozilla Firefox" },
      { title: "Microsoft Edge" },
      { title: "Apple Safari" },
    ],
  },
  {
    headerName:
      "3. You have disabled all the browser extensions and enabled Add-ons.",
    array: [],
  },
  { headerName: "4. You open the assessment in incognito mode.", array: [] },
];

export const assessmentInstructionTitleArray = [
  { title: "This is an online test." },
  {
    title:
      "Please make sure that you are using the latest version of the browser. We recommend using Google Chrome.",
  },
  {
    title:
      "It's mandatory to disable all the browser extensions and enabled Add-ons or open the assessment in incognito mode. ",
  },
  {
    title:
      "If you are solving a coding problem, you will either be required to choose a programming language from the options that have been enabled by the administrator or choose your preferred programming language in case no options have been enabled by the administrator. Note: In case you're solving coding problems: All inputs are from STDIN and output to STDOUT.",
  },
  {
    title:
      " If test mandates you to use the webcam, please provide the required permissions and access.",
  },
  {
    title: "To know the results, please contact the administrator.",
  },

  {
    title:
      "To refer to the FAQ document, you can click on the HELP button which is present in the top right corner of the test environment.",
  },
];
export const collapsableData = [
  {
    header:
      "Which programming languages or frameworks should I be using to solve the assessment?",
    content: `The administrator/ employer organization of the assessment has enabled a set of
  languages or frameworks that needs to be used to solve this particular assessment.
  Please see the list in the drop down and choose the one that you would like to use.`,
  },
  {
    header: "I am not able to see question and images? What should I do?",
    content: ``,
  },
  {
    header:
      "My screen is freezed and I am not able to navigate between the problems? What should I do?",
    content: ``,
  },
  {
    header:
      "What happens to my assessment if I lose the internet connectivity while taking a assessment?",
    content: ``,
  },
  {
    header:
      "I am getting “Webcam.js (or) Waiting for webcam” error or “AGREE AND CONTINUE” button is disabled. What should I do?",
    content: ``,
  },
  {
    header:
      "I am getting “System time” error or “AGREE AND CONTINUE” button is disabled. What should I do?",
    content: ``,
  },
];
export const identityArray = [
  { title: "Look straight into the camera" },
  { title: "Your face is not covered" },
  { title: "Room is properly light" },
  { title: "There is no other person or picture of a person in the frame" },
];
export const systemCheckArray = [
  {
    status: true,
    icon: network,
    header: "High internet Speed",
    subHeader: "40.895 mbps  download,27.685 mbps upload-looks good!",
  },
  {
    status: false,
    icon: os,
    header: "Operating System",
    subHeader: "Windows 10 - looks good!",
  },
  {
    status: false,
    icon: browser,
    header: "Chrome browser upto date",
    subHeader: "Chrome V.66.0.3359.81 - looks good!",
  },
];
export const testSystem = [
  {
    status: true,
    icon: audio,
    header: "Audio output",
    buttonName: "Test Speakers",
  },
  {
    status: false,
    icon: mic,
    header: "Microphone",
    buttonName: "Test Microphone",
  },
  {
    status: true,
    icon: webcam,
    header: "Webcam",
    buttonName: "Test Webcam",
  },
];
export const inputArray = [
  {
    label: "Full name",
    placeHolder: "Enter Full name",
    inputType: "string",
    range: "",
    pattern: /^[a-zA-Z\s!”$"@'%&’()*+,;[\\\]^_`{|}~]+$/,
    message: "Numbers not allowed",
  },
  {
    label: "Email",
    placeHolder: "Enter Email",
    inputType: "email",
    range: "",
    pattern: "",
    message: "Email is not valid",
  },
  {
    label: "Phone no",
    placeHolder: "Enter Phone no",
    inputType: "string",
    range: 20,
    pattern: /^[0-9]*$/,
    message: "Phone no is not valid",
  },
];
export const formDataArray = [
  {
    label: "First Name",
    required: true,
    type: "input"
  },
  {
    label: "Last Name",
    required: true,
    type: "input"
  },
  {
    label: "Phone Number",
    required: true,
    type: "input"
  },
  {
    label: "Email ID",
    required: true,
    type: "input"
  },
  {
    label: "About",
    required: true,
    type: "textarea"
  },
  {
    label: "Select Gender",
    options: ["Male", "Female"],
    type: "radio"
  },
  {
    label: "Select Topic",
    options: ["Java", "Python", "Database", "Alogorithms"],
    type: "radio"
  },
  {
    label: "Select Test",
    options: ["Java Data type", "Java Int to String", "Java Loops I", "Java Strings Introduction"],
    type: "checkbox"
  },

  {
    label: "Date",
    type: "date"
  },
  {
    label: "Time",
    type: "time"
  },
  {
    label: "Select Test 2",
    options: ["test1", "test2"],
    type: "select"
  },
  {
    label: "Upload file",
    type: "file"
  }
];

