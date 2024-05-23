import React from "react";
import { Row, Col, Table } from "antd";
import PropTypes from "prop-types";
import style from "./table.module.scss";

interface TableContainerProps {
  data: any;
  columnsData: any;
  classData: any;
  onChange: any;
  pagination: any;
  scroll: any;
  rowKey: any;
  rowSelection: any;
  rowClassName: any;
  bordered: any;
}

const TableContainer: React.FC<TableContainerProps> = ({
  columnsData,
  data,
  classData,
  onChange,
  pagination,
  scroll,
  rowKey,
  rowSelection,
  rowClassName,
  bordered,
}) => {
  return (
    <div className={style.table}>
      <Row>
        <Col span={24}>
          <Table
            dataSource={data}
            columns={columnsData}
            className={classData}
            onChange={onChange}
            pagination={pagination}
            scroll={scroll}
            rowKey={rowKey || null}
            bordered={bordered}
            rowSelection={rowSelection || null}
            rowClassName={rowClassName || null}
          />
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(TableContainer);
