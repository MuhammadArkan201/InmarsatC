// import React from "react";
import "./Modal.css";
import { CloseOutlined } from "@ant-design/icons";
import { Radio, InputNumber, Button, DatePicker, Space, Select } from "antd";

const { RangePicker } = DatePicker;

const onChange = (value, dateString) => {
  console.log("Selected Time: ", value);
  console.log("Formatted Selected Time: ", dateString);
};

const onChangeNumber = (value) => {
  console.log("changed", value);
};

const onOk = (value) => {
  console.log("onOk: ", value);
};

function Modal({ setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <CloseOutlined />
          </button>
        </div>
        <div className="head-popup">Set Time Period</div>
        <div className="popup-body">
          <div>
            <div className="radiobtn">
              <Radio className="radio-text" value={1}>
                Live data starting from relative time
              </Radio>
            </div>
          </div>
          <div>
            <Select
              className="datepicker-format"
              defaultValue="24 Hours"
              options={[
                {
                  value: "24Hours",
                  label: "24 Hours",
                },
                {
                  value: "12Hours",
                  label: "12 Hours",
                },
                {
                  value: "6Hours",
                  label: "6 Hours",
                },
              ]}
            />
          </div>{" "}
          <div className="radiobtn">
            <Radio className="radio-text" value={2}>
              Live data starting from absolute time
            </Radio>
          </div>
          <div>
            <DatePicker className="datepicker-format" />
          </div>
          <div className="radiobtn">
            <Radio className="radio-text" value={3}>
              Historic data
            </Radio>
          </div>
          <div>
            <Space size={12}>
              <RangePicker
                className="datepicker-format"
                showTime={{
                  format: "HH:mm",
                }}
                format="YYYY-MM-DD HH:mm"
                onChange={onChange}
                onOk={onOk}
              />
            </Space>
          </div>
          <div className="radiobtn">
            <Radio className="radio-text" value={4}>
              Resolution
            </Radio>
          </div>
          <div className="datepicker-format">
            <InputNumber
              className="datepicker-format"
              min={0}
              onChangeNumber={onChangeNumber}
              placeholder="Resolution (Second)"
            />
          </div>
        </div>
        <div className="footer">
          <Button type="primary" className="btn">
            Apply
          </Button>
          
        </div>
      </div>
    </div>
  );
}

export default Modal;
