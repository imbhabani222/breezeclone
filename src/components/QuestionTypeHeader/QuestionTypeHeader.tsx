import React, { useEffect, useState, useCallback } from "react";
import {
  Space,
  Typography,
  Menu,
  Dropdown,
  Button,
  message,
  Select,
  Switch,
} from "antd";
import DropdownArrow from "../../assets/dropdown_btn.svg";
import lastSaveClock from "../../assets/clock_save.svg";

import style from "./questionTypeHeader.module.scss";

import ExclamationCircleDark from "../../assets/exclamation_circle_dark.svg";
import ChangeThemeIcon from "../../assets/change-theme.svg";

import threeDots from "../../assets/ThreeDots.svg";

import loadStub from "../../assets/loadStub.svg";
import toggle from "../../assets/toggleSvg.svg";

import UnsolveIcon from "../../assets/unsolve-icon.svg";
import mobile_edit from "../../assets/mobile_edit_circle.svg";

import mcq_edit from "../../assets/mcqedit.svg";

import moment from "moment";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { getTechnology } from "../../selectors/selectors";

const { Text } = Typography;

const QuestionTypeHeader = (props: any) => {
  const { showLastSave } = props;
  const [language, setLanguage] = useState(props.language);
  const [expires, setExpires] = useState<any>(null);
  const getTime = (time: string) => {
    return moment(time).format(" h:mm a");
  };

  const onTechnologyChange = (event: any) => {
    props.handleLanguage(event);
  };

  useEffect(() => {
    setExpires(moment.utc(props.lastSave).valueOf());
  }, [props.lastSave]);
  useEffect(() => {
    setLanguage(props.language);
  }, [props.language]);

  const statusData = [
    {
      icon: props.title === "UNSOLVED" ? UnsolveIcon : mcq_edit,
      text: props.title,
    },
    {
      icon: !props.lastSave ? lastSaveClock : lastSaveClock,
      className:
        props.lastSave === "No Data" ? style.hideSave : "showLastSaveIcon",
      text: expires ? `Last save at ${getTime(expires)}` : "No Data",
      hide: props?.title === "UNSOLVED" ? !showLastSave : showLastSave,
    },
  ];

  const changeTheme: any = () => {
    props.changeTheme();
  };

  const { Option } = Select;

  // let defaultLang = Object.keys(props.defaultLangauges);

  const getTechnologies = useSelector(getTechnology);

  let getAllowedTech = getTechnologies;
  let allowedTechnologies = getAllowedTech?.technologies?.filter((val: any) =>
    val.allowed_in.includes("SCR")
  );
  let mapSlugdata = allowedTechnologies?.map((tech: any) => tech);

  // let stubdata = allowedTechnologies?.map((tech: any) => tech);

  // console.log(stubdata, "stub");
  let currentLanguage = null || "Node";

  function onChange(checked: any) {
    console.log(`switch to ${checked}`);
  }

  const menu = (
    <Menu>
      <div className={style.dropDownContainer}>
        <Menu.Item>
          <div className={style.menuItem}>
            <img src={loadStub} alt={"ICON"} />
            <p className={style.content}> Load Language Stub</p>
          </div>
        </Menu.Item>
        {/* <div className={style.menuItem}> */}
        {/* <Menu.Item>
          <img src={toggle} alt={"ICON"} className={style.toggle} />
          Enable auto-complete
        </Menu.Item> */}
        {/* </div> */}
      </div>
    </Menu>
  );

  // console.log(props, "props");

  return (
    <div className={style.container}>
      <div className={style.problemType}>
        <div className={style.heading}>
          {<img src={ExclamationCircleDark} alt={"Icon"} />}
          <h4>{props.type}</h4>
        </div>
      </div>
      {props.theme ? (
        <div className={style.selectDropdown}>
          <Select
            suffixIcon={<img src={DropdownArrow} alt={"Icon"} />}
            value={language}
            onChange={onTechnologyChange}
          >
            {mapSlugdata &&
              mapSlugdata?.map((lang: any, index: number) => {
                return (
                  <Option value={lang.slug} key={index}>
                    {lang.name}
                  </Option>
                );
              })}
          </Select>
        </div>
      ) : null}
      <div className={style.status}>
        <>
          {statusData
            .filter((item: any) => !item.hide)
            .map((item: any, idx) => (
              <div
                key={idx}
                className={clsx(
                  props.title === "UNSOLVED"
                    ? style.statusItem
                    : style.statusItemWhite,
                  item.className
                )}
              >
                <img src={item.icon} alt={"ICON"} />
                <Text>{item.text}</Text>
              </div>
            ))}
          {props.theme ? (
            <>
              <div className={style.changeTheme}>
                <Button className={style.themeCssolor} onClick={changeTheme}>
                  <img src={ChangeThemeIcon} alt={"ICON"} />
                  Change Theme
                </Button>
              </div>

              <div className={style.changeTheme}>
                {/* <Button className={style.themeCssolor} onClick={changeTheme}>
                  :
                </Button> */}
                <Dropdown overlay={menu} placement="bottomRight" arrow>
                  <Button>
                    <img src={threeDots} alt={"ICON"} />
                  </Button>
                </Dropdown>
              </div>
            </>
          ) : null}
        </>
      </div>
    </div>
  );
};

export default React.memo(QuestionTypeHeader);
