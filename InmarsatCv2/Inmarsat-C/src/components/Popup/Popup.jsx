import { useState } from "react";
import "../../App.css";
import PropTypes from "prop-types";
import { Button, Modal, DatePicker, Radio, Space, Select } from "antd";

const { RangePicker } = DatePicker;

const Popup = ({ onShowTable, onRangePickerChange }) => {
  const [open, setOpen] = useState(false);
  const [dateValue, setDateValue] = useState(null);
  const [radioValue, setRadioValue] = useState(1);
  const [outerDate, setOuterDate] = useState(null);

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
      handleCancel();
      // You might perform other operations here
    }
  };

  const onSubmit = async () => {
    if (dateValue) {
      onShowTable();
      onRangePickerChange(dateValue);
    }
  };

  const onDatePickerChange = (date) => {
    setDateValue(date);
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
      <Button className="btn" onClick={onSubmit}>
        Submit
      </Button>
    </>
  );
};

Popup.propTypes = {
  onShowTable: PropTypes.func.isRequired,
  onRangePickerChange: PropTypes.func.isRequired,
};

export default Popup;