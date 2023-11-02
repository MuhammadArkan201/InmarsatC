import React, { useState } from "react";
import "../../App.css";
import { Button, Modal, DatePicker, Radio, Space, Select } from "antd";

const { RangePicker } = DatePicker;

const Popup = () => {
  const [setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [dateValue, setDateValue] = useState(null); // State to store the selected date

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const [radioValue, setRadioValue] = useState(1);
  const [outerDate, setOuterDate] = useState(null); // State to hold the value of the RangePicker outside the Modal

  const onChange = (e) => {
    setRadioValue(e.target.value);
  };

  const onApply = () => {
    if (dateValue) {
      setOuterDate(dateValue); // Apply the selected date to the RangePicker outside the Modal
      handleCancel(); // Close the Modal after applying the date
    }
  };

  const onDatePickerChange = (date, dateString) => {
    setDateValue(date);
  };

  return (
    <>
      <RangePicker
        className="rangepickerformat"
        showTime={{
          format: "HH:mm",
        }}
        format="YYYY-MM-DD HH:mm"
        value={outerDate} // Set the value of the RangePicker outside the Modal
        onOk={handleOk}
        onClick={showModal}
        open={false}
      />

      <Modal
        className="popup-modal"
        open={open}
        title="Set Time Period"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            className="popupbtn"
            key="submit"
            type="primary"
            onClick={onApply} // Function to apply the selected date to the RangePicker
          >
            Apply
          </Button>,
        ]}
      >
        <Radio.Group onChange={onChange} value={radioValue}>
          <div className="radiobtn">
            <Radio className="radio-text" value={1}>
              Live data starting from relative time
            </Radio>
          </div>
          <div>
            <Space size={12}>
              <Select
                className="datepicker-format"
                defaultValue="24 Hours"
                disabled={radioValue !== 1}
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

            </Space>
          </div>
          <div className="radiobtn">
            <Radio className="radio-text" value={2}>
              Live data starting from absolute time
            </Radio>
          </div>
          <div>
            <Space size={12}>
              <DatePicker
                className="datepicker-format"
                disabled={radioValue !== 2}
                onChange={onDatePickerChange}
              />
            </Space>
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
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                onChange={onDatePickerChange}
                disabled={radioValue !== 3}
              />
            </Space>
          </div>
        </Radio.Group>
      </Modal>
      <Button className="btn">Submit</Button>
    </>
  );
};

export default Popup;
