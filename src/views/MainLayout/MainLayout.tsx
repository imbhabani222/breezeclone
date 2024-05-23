import React, { useCallback, useEffect, useState, FC } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Layout, Spin } from "antd";
import moment from "moment";

import styles from "../../App.module.scss";

import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

import DataBar from "../../components/dataBar/dataBar";
import BreezeModal from "../../components/modal/modal";
import timerData from "../../data/counter.json";

import { getSubmitConformationModal } from "../../constants/modals";
import { systemActions } from "../../actions/actions";
import { getTestPending, getcheckAction } from "../../selectors/selectors";
import { useLocation } from "react-router-dom";

import Loader from "../../assets/loader.svg";
import FullscreenMode from "./fullscreenMode";

import AppUseScript from "../../useScript";
import Error404 from "../ErrorPages/404";

interface Props {
  component: any;
}
const { Content } = Layout;
const { timeLeft } = timerData;
const MainLayout: FC<Props> = ({ component, ...props }) => {
  const antIcon = <img alt="Loading" className={styles.loader} src={Loader} />;
  const testPending = useSelector(getTestPending);
  const [showWarningModal, setWarningModal] = useState(false);
  const location = useLocation();
  const solutionPages = location.pathname.includes("problems/");
  const getPathName = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      systemActions({ timeLeft: moment().add(timeLeft, "seconds").valueOf() })
    );
  }, [dispatch]);

  const hideModal = useCallback(() => {
    dispatch(systemActions({ showModal: false }));
  }, [dispatch]);

  const systemActionReducer = useSelector(
    (state: any) => state.appReducer && state.appReducer.actionReducer,
    shallowEqual
  );

  const systemActionSelector = useSelector(getcheckAction);

  const submissionModalData = useCallback(() => {
    const data = getSubmitConformationModal({
      onOk: hideModal,
      onCancel: hideModal,
      timeLeft: systemActionReducer.timeLeft,
    });
    return (
      <BreezeModal modalData={data} visible={systemActionReducer.showModal} />
    );
  }, [systemActionReducer, hideModal]);
  useEffect(() => {
    if (systemActionReducer) {
      setWarningModal(systemActionReducer.showModal);
    }
  }, [systemActionReducer]);
  return (
    <Layout className={styles.mainLayout}>
      <Navbar />
      {getPathName === "Feedback" || getPathName === "TestComplete" ? (
        ""
      ) : (
        <FullscreenMode />
      )}

      {testPending ? (
        <div className={styles.mainLayout_loader}>
          {/* <Spin spinning={testPending} indicator={antIcon}></Spin> */}
        </div>
      ) : (
        <Content className={styles.container}>
          <DataBar />
          <div className={styles.content}>{component}</div>
          {/* <Error404 /> */}
        </Content>
      )}
      {/* <AppUseScript /> */}
      {showWarningModal && submissionModalData()}
      {solutionPages ? null : <Footer />}
    </Layout>
  );
};

export default React.memo(MainLayout);
