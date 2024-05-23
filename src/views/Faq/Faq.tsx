import React, { useEffect, useState } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { Tabs, Row, Col, Typography, Image, Input } from "antd";

import infoIcon from "../../assets/Images/infoIcon.svg";
import searchIcon from "../../assets/Images/MagnifyingGlass.svg";

import styles from "./Faq.module.scss";

import LoadMore from "../LoadMore/LoadMore";
import CardCollapse from "../../components/collapse/CardCollapse";
import TableContainer from "../../components/TableContainer/TableContainer";

import messages from "../../constants/messages";
import { data } from "./data";
import codingEnvDetails from "../../data/codingEnvDetails.json";
import { columnsCED, columnsSER } from "./column";
import faqCardsData from "../../data/faq-cards.json";

import statusCode from "../../data/statusCode.json";

import { stringFiller } from "../../data/utils";

import { sampleAction } from "../../actions/actions";
import { getTest } from "../../selectors/selectors";
import purifyInnerHtml from "../../utils/innerHTML";

const {
  FAQ: { FAQINFOTEXT, SEARCH_PLACEHOLDER, TAB1, TAB2, TAB3, KEY1, KEY2, KEY3 },
  ICON,
} = messages;

const { TabPane } = Tabs;
const { Paragraph } = Typography;

const Faq = () => {
  const dispatch = useDispatch();
  const [loadTill, setCount] = useState(10);
  useEffect(() => {
    dispatch(sampleAction());
  }, [dispatch]);

  const sampleReducerResponse = useSelector(
    (state: any) => state.appReducer && state.appReducer.sampleReducer,
    shallowEqual
  );

  useEffect(() => {
    if (sampleReducerResponse && sampleReducerResponse.result) {
    }
  }, [sampleReducerResponse]);

  const loadMore = () => {
    setCount(loadTill + 8);
  };
  const testDetails = useSelector(getTest);
  const type = testDetails?.test_type_verbose;

  const [cardData, setCardData] = useState(faqCardsData);

  const onSearch = (value: any) => {
    const filterData = faqCardsData.filter((o: any) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.target.value.toLowerCase())
      )
    );
    setCardData(filterData);
  };

  const FaqTabs = () => (
    <Tabs key={KEY1}>
      <TabPane tab={TAB1}>
        {cardData &&
          cardData
            .slice(0, loadTill)
            .map((val, index) => (
              <CardCollapse
                question={
                  <div>
                    {purifyInnerHtml(stringFiller(val.question, { type }))}
                  </div>
                }
                key={index}
                index={index}
                answer={
                  <div>
                    {purifyInnerHtml(stringFiller(val.answer, { type }))}
                  </div>
                }
              />
            ))}
        {loadTill < cardData.length && <LoadMore onClick={loadMore} />}
      </TabPane>
      <TabPane tab={TAB2} key={KEY2}>
        <div>
          <TableContainer
            columnsData={columnsCED}
            bordered
            data={codingEnvDetails}
            onChange={null}
            pagination={false}
            rowKey={null}
            classData={null}
            rowSelection={null}
            rowClassName={null}
            scroll={{ y: 800, x: 700 }}
          />
        </div>
      </TabPane>
      <TabPane tab={TAB3} key={KEY3}>
        <TableContainer
          columnsData={columnsSER}
          onChange={null}
          rowKey={null}
          classData={null}
          rowSelection={null}
          rowClassName={null}
          bordered
          data={statusCode}
          pagination={false}
          scroll={{ x: 700 }}
        />
      </TabPane>
    </Tabs>
  );

  return (
    <>
      <div className={styles.subcontainer}></div>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.InfoSearch}>
            <div className={styles.InfoBox}>
              <span>
                <Image src={infoIcon} alt={ICON} preview={false} />
              </span>
              <Paragraph className={styles.text}>{FAQINFOTEXT}</Paragraph>
            </div>
            <div className={styles.searchContainer}>
              <div className={styles.searchBox}>
                <Image src={searchIcon} alt={ICON} preview={false} />
                <input placeholder={SEARCH_PLACEHOLDER} onChange={onSearch} />
              </div>
            </div>
          </div>
          <div className={styles.tabContainer}>
            <FaqTabs />
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Faq);
