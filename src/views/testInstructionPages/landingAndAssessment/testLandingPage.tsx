/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Checkbox,
  Row,
  Col,
  Typography,
  Button,
  Radio,
  Select,
  DatePicker,
  TimePicker,
  Upload,
  message,
} from "antd";
import clsx from "clsx";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";

import ladyImg from "../../../assets/lady-img.svg";
import calender from "../../../assets/Images/Shape.svg";
import downArrow from "../../../assets/Images/downarrow.svg";
import rightArrow from "../../../assets/right-arrow.svg";
import rightArrowDisabled from "../../../assets/arrow-disabled.svg";

import styles from "./instructionPageStyle.module.scss";

import instructionDetails from "../../../constants/instructionConstant";
import constants from "../../../constants/constants";
import { landingPageArray, formDataArray } from "../../../data/instructionData";

const { Text, Paragraph } = Typography;
const { TextArea } = Input;
const {
  ALT_IMG,
  INSTRUCTION_DOSELECT,
  ENJOY_BEST_EXP,
  ASSESSMENT_INVITATION_SENT,
  USER_EMAIL,
  ENTER_DETAILS,
  T_AND_C,
  PROCEED,
  SAMPLE_ASSESSMENT,
  TO_TAKE_SAMPLE,
  SAMPLE,
  SAMPLE_PROCEED,
  CLICK_HERE,
  ASSESSMENT_RECOMMENDATION,
  NOTE,
} = instructionDetails;
const {
  ROUTE: { INSTRUCTION_PAGE },
} = constants;

const TestLandingPage = () => {
  const [formData, setFormData] = useState({});
  const [tandc, setTandC] = useState(false);
  const [state, setState] = useState({
    loading: false,
    imageUrl: "",
  });
  const [radioData, setRadioData] = useState(1);
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const onChangeCheck = useCallback((e) => {
    setTandC(e.target.checked);
  }, []);
  const goToInstructionPage = useCallback(() => {
    navigate(INSTRUCTION_PAGE);
  }, [navigate]);
  const onFinish = useCallback(
    (values) => {
      setFormData(values);
      if (values?.Email) {
        goToInstructionPage();
      }
    },
    [goToInstructionPage]
  );
  const mappedData = useCallback(() => {
    return landingPageArray.map((data, index) => {
      return (
        <div key={index}>
          <Paragraph className={styles.landing_header_content}>
            {data.headerName}
          </Paragraph>
          {data.array.map((nestedData, indexes) => {
            return (
              <div key={indexes} className={styles.flex_class_ellipse}>
                <div className={styles.ellipse}></div>
                <div
                  className={clsx(
                    styles.common_text_header,
                    styles.ellipse_text
                  )}
                >
                  {nestedData.title}
                </div>
              </div>
            );
          })}
        </div>
      );
    });
  }, []);
  const onChange = (e: any) => {
    setRadioData(e.target.value);
    //  console.log("radio checked", e.target.value);
  };
  const onChangeDate = (date: any, dateString: any) => {
    //  console.log(date, dateString);
  };
  const onChangeTime = (time: any, timeString: any) => {
    //  console.log(time, timeString);
  };

  const uploadButton = (
    <div>
      {state.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div>Upload</div>
    </div>
  );
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
  const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    // file.type === "text/txt" ||
    // file.type === "application/zip" ||
    // file.type === "application/pdf" ||
    // file.type === "text/docx" ||
    // file.type === "text/xlsx";
    if (!isJpgOrPng) {
      message.error("You can only upload JPEG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      message.error("Image must smaller than 10MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  const handleChangeFile = (info: any) => {
    if (info.file.status === "uploading") {
      setState({ imageUrl, loading: true });
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl: any) =>
        setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };
  const { loading, imageUrl } = state;
  return (
    <div>
      <div className={styles.parent_div}>
        <div className={styles.testlanding_main_wrapper}>
          <div className={styles.testlanding_body_wrapper}>
            <div className={styles.main_container}>
              <div className={styles.insruction_div}>
                <div className={styles.lady_img_mobile}>
                  <img
                    alt={ALT_IMG}
                    className={styles.img_fluid}
                    src={ladyImg}
                  />
                </div>
                <Text className={styles.instruction_header}>
                  {INSTRUCTION_DOSELECT}
                </Text>
              </div>
              <Row className={styles.body_div}>
                <Col xs={24} sm={24} md={14}>
                  <Text className={styles.common_text_header}>
                    {ENJOY_BEST_EXP}
                  </Text>
                  {mappedData()}
                </Col>
                <Col xs={24} sm={24} md={10} className={styles.flex_class_img}>
                  <div className={styles.lady_img}>
                    <img
                      alt={ALT_IMG}
                      className={styles.img_fluid}
                      src={ladyImg}
                    />
                  </div>
                </Col>
              </Row>
              <div className={styles.card_style}>
                <div className={styles.card_body_wrapper}>
                  <Paragraph className={styles.instruction_card_header}>
                    {ASSESSMENT_INVITATION_SENT}
                  </Paragraph>
                  <Paragraph className={styles.instruction_card_email}>
                    {USER_EMAIL}
                  </Paragraph>
                  <Paragraph className={styles.instruction_nprmal_text}>
                    {ENTER_DETAILS}
                  </Paragraph>
                  <div
                    className={clsx(
                      styles.instruction_nprmal_text,
                      styles.form_wrapper
                    )}
                  >
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                      <Row gutter={50}>
                        {formDataArray?.map((data: any, index: any) => {
                          switch (data.type) {
                            case "input":
                              return (
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                  <Form.Item
                                    key={index}
                                    name={data.label}
                                    label={data.label}
                                    rules={[{ required: data.required }]}
                                  >
                                    <Input placeholder={data.label} />
                                  </Form.Item>
                                </Col>
                              );
                            case "textarea":
                              return (
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                  <Form.Item
                                    key={index}
                                    name={data.label}
                                    label={data.label}
                                    rules={[{ required: data.required }]}
                                  >
                                    <TextArea
                                      rows={10}
                                      placeholder={data.label}
                                      maxLength={10}
                                    />
                                  </Form.Item>
                                </Col>
                              );

                            case "radio":
                              return (
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                  <Form.Item
                                    key={index}
                                    name={data.label}
                                    label={data.label}
                                    rules={[{ required: data.required }]}
                                  >
                                    <Radio.Group onChange={(e) => onChange(e)}>
                                      {data.options?.map(
                                        (item: any, index: any) => (
                                          <Radio value={item}>{item}</Radio>
                                        )
                                      )}
                                    </Radio.Group>
                                  </Form.Item>
                                </Col>
                              );
                            case "checkbox":
                              return (
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                  <Form.Item
                                    key={index}
                                    name={data.label}
                                    label={data.label}
                                    rules={[{ required: data.required }]}
                                  >
                                    <Checkbox.Group
                                      options={data.options}
                                      onChange={onChange}
                                    />
                                  </Form.Item>
                                </Col>
                              );

                            case "select":
                              return (
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                  <Form.Item
                                    key={index}
                                    name={data.label}
                                    label={data.label}
                                    rules={[{ required: data.required }]}
                                  >
                                    <Select
                                      placeholder={data.label}
                                      suffixIcon={
                                        <img src={downArrow} alt={downArrow} />
                                      }
                                    >
                                      {data.options.map(
                                        (fr: any, index: any) => {
                                          return (
                                            <Select.Option
                                              key={index}
                                              value={fr}
                                            >
                                              {fr}
                                            </Select.Option>
                                          );
                                        }
                                      )}
                                    </Select>
                                  </Form.Item>
                                </Col>
                              );
                            case "file":
                              return (
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                  <Form.Item
                                    key={index}
                                    name={data.label}
                                    label={data.label}
                                    rules={[{ required: data.required }]}
                                  >
                                    <div className={styles.upload_btn}>
                                      <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        beforeUpload={beforeUpload}
                                        onChange={handleChangeFile}
                                      >
                                        {imageUrl ? (
                                          <img
                                            src={imageUrl}
                                            alt="avatar"
                                            style={{ width: "100%" }}
                                          />
                                        ) : (
                                          uploadButton
                                        )}
                                      </Upload>
                                      <div className={styles.upload_text}>
                                        File format PDF, Microsoft Word, Excel
                                        document format, ZIP, JPEG, TEXT,The
                                        size should be less than “ 10 MB
                                      </div>
                                    </div>
                                  </Form.Item>
                                </Col>
                              );

                            case "date":
                              return (
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                  <Form.Item
                                    key={index}
                                    name={data.label}
                                    label={data.label}
                                    rules={[{ required: data.required }]}
                                  >
                                    <DatePicker
                                      suffixIcon={
                                        <img src={calender} alt={calender} />
                                      }
                                      format={dateFormatList}
                                      onChange={onChangeDate}
                                    />
                                  </Form.Item>
                                </Col>
                              );
                            case "time":
                              return (
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                  <Form.Item
                                    key={index}
                                    name={data.label}
                                    label={data.label}
                                    rules={[{ required: data.required }]}
                                  >
                                    <TimePicker
                                      use12Hours
                                      onChange={onChangeTime}
                                      defaultOpenValue={moment(
                                        "00:00:00",
                                        "HH:mm:ss"
                                      )}
                                    />
                                  </Form.Item>
                                </Col>
                              );
                            default:
                              return null;
                          }
                        })}
                      </Row>
                      {/* {inputArray?.map((data: any, index: any) => {
                        return (
                          <Form.Item
                            key={index}
                            name={data.label}
                            label={data.label}
                            rules={[
                              {
                                type: data.inputType,
                                pattern: new RegExp(data.pattern),
                                message: data.message,
                                max: data.range
                              },
                              { required: true }
                            ]}
                          >
                            <Input placeholder={data.placeHolder} />
                          </Form.Item>
                        );
                      })} */}
                      <div
                        className={clsx(
                          styles.checkbox_main_div,
                          styles.checkbox_dflex
                        )}
                      >
                        <Checkbox
                          className={styles.check_box_style}
                          onChange={onChangeCheck}
                        ></Checkbox>
                        <Paragraph className={styles.checkbox_text}>
                          {T_AND_C}
                        </Paragraph>
                      </div>
                      <Button
                        onClick={onFinish}
                        htmlType="submit"
                        className={clsx({
                          [styles.disabled_btn]: !tandc,
                          [styles.btn_gray]: true,
                        })}
                      >
                        {PROCEED}
                        <img
                          alt={ALT_IMG}
                          className={styles.instruction_btn_rightarrow}
                          src={tandc ? rightArrow : rightArrowDisabled}
                        />
                      </Button>
                    </Form>
                  </div>
                  <div
                    className={clsx(
                      styles.instruction_card_email,
                      styles.sample_assessment_div
                    )}
                  >
                    {SAMPLE_ASSESSMENT}
                  </div>
                  <div className={styles.plain_text_footer}>
                    <Paragraph className={styles.footer_assessment_txt}>
                      {ASSESSMENT_RECOMMENDATION}
                    </Paragraph>
                    <Paragraph className={styles.footer_assessment_txt}>
                      <Text className={styles.url_link_clr}>{CLICK_HERE}</Text>{" "}
                      {TO_TAKE_SAMPLE}
                      <Text className={styles.sample}>{SAMPLE}</Text>
                      {SAMPLE_PROCEED}
                    </Paragraph>
                    {NOTE}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TestLandingPage);
