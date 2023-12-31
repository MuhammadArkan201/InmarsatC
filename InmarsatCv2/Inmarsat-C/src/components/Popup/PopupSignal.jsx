import React, { useState } from "react";
import "../../App.css";
import moment from "moment";
import PropTypes from "prop-types";
import { Button, Modal, DatePicker, Radio, Space, Select, InputNumber } from "antd";

const { RangePicker } = DatePicker;

const PopupSignal = ({ onShowSignal, onRangePickerChange, onResolutionChange }) => {
  const [open, setOpen] = useState(false);
  const [dateValue, setDateValue] = useState(null);
  const [radioValue, setRadioValue] = useState(1);
  const [outerDate, setOuterDate] = useState(null);
  const [resolution, setResolution] = useState(300); // Default resolution is set to 300 seconds
  const [selectValue, setSelectValue] = useState(null);

  const onChangeNumber = (value) => {
    setResolution(value);
    onResolutionChange(value); // Pass resolution to onResolutionChange
  };
  
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onChange = (e) => {
    setRadioValue(e.target.value);
  };

  const onApply = () => {
    if (dateValue) {
      setOuterDate(dateValue);
      onRangePickerChange(dateValue, resolution);
      handleCancel();
    }
  };

  const onSubmit = async () => {
    if (dateValue) {
      onShowSignal();
      onRangePickerChange(dateValue, resolution);
    }
  };

  const onDatePickerChange = (date, dateString) => {
    if (radioValue === 1) {
      handleSelectChange(dateString);
    } else if (radioValue === 2) {
      const currentdate = date ? date : null;
      const startlive = moment();
      const range = [currentdate, startlive];
      setDateValue(range);
    } else {
      setDateValue(date);
    }
  };

  const handleSelectChange = (value) => {
    setSelectValue(value);
    const selectedHours = parseInt(value, 10);
    if (!isNaN(selectedHours)) {
      const start = moment().subtract(selectedHours, "hours");
      const end = moment();
      const range = [start, end];
      setDateValue(range);
    }
  };

  return (
    <>
      <RangePicker
        key="rangePickerKey"
        className="rangepickerformat"
        showTime={{ format: "HH:mm" }}
        format="YYYY-MM-DD HH:mm"
        value={outerDate}
        onOpenChange={showModal}
        open={false}
        onChange={onDatePickerChange}
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
            onClick={onApply}
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
                value={selectValue}
                placeholder="Choose the relative time"
                disabled={radioValue !== 1}
                onChange={handleSelectChange}
                options={[
                  {
                    value: "24",
                    label: "Last 24 Hours",
                  },
                  {
                    value: "12",
                    label: "Last 12 Hours",
                  },
                  {
                    value: "6",
                    label: "Last 6 Hours",
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
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                dropdownClassName="custom-dropdown"
                onChange={(range) => onDatePickerChange(range)}
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
                dropdownClassName="custom-dropdown"
                disabled={radioValue !== 3}
              />
            </Space>
          </div>
        </Radio.Group>
        <div>
          <div className="radiotitle">
            <div className="radio-text">Resolution (Second)</div>
          </div>
          <Space size={12}>
            <InputNumber
              className="datepicker-format"
              min={0}
              onChange={onChangeNumber}
              placeholder="Resolution (Second)"
              defaultValue={300}
            />
          </Space>
        </div>
      </Modal>
      <Button className="submitbtn" onClick={onSubmit} disabled={!dateValue}>
        Submit
      </Button>
    </>
  );
};

PopupSignal.propTypes = {
  onShowSignal: PropTypes.func.isRequired,
  onRangePickerChange: PropTypes.func.isRequired,
  onResolutionChange: PropTypes.func.isRequired,
};

export default PopupSignal;