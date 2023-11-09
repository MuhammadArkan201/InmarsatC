import { useState } from "react";
import "../../App.css";
import PropTypes from "prop-types";
import {
  Button,
  Modal,
  DatePicker,
  Radio,
  Space,
  Select,
  InputNumber,
} from "antd";

const { RangePicker } = DatePicker;

const PopupSignal = ({ onRangePickerChange }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [dateValue, setDateValue] = useState(null);
  const [radioValue, setRadioValue] = useState(1);
  const [outerDate, setOuterDate] = useState(null);
  const [resolution, setResolution] = useState(null); // State to hold the resolution value

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

  const onChange = (e) => {
    setRadioValue(e.target.value);
  };

  const onApply = () => {
    if (dateValue) {
      setOuterDate(dateValue);
      handleCancel();
      onRangePickerChange(dateValue);
    }
  };

  const onDatePickerChange = (date) => {
    setDateValue(date);
  };

  const onChangeNumber = (value) => {
    console.log("changed", value);
    setResolution(value);
  };

  return (
    <>
      <RangePicker
        className="rangepickerformat"
        showTime={{
          format: "HH:mm",
        }}
        format="YYYY-MM-DD HH:mm"
        value={outerDate}
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
                disabled={radioValue !== 1}
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
          <div className="radiobtn">
            <Radio className="radio-text" value={4}>
              Resolution
            </Radio>
          </div>
          <div>
            <Space size={12}>
              <InputNumber
                className="datepicker-format"
                min={0}
                disabled={radioValue !== 4}
                onChange={onChangeNumber}
                placeholder="Resolution (Second)"
              />
            </Space>
          </div>
        </Radio.Group>
      </Modal>
      <Button className="btn" onClick={onApply}>
        Submit
      </Button>
    </>
  );
};

PopupSignal.propTypes = {
  onRangePickerChange: PropTypes.func.isRequired,
};

export default PopupSignal;
