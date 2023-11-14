  import { useState } from "react";
  import "../../App.css";
  import PropTypes from "prop-types";
  import moment from "moment";
  import { Button, Modal, DatePicker, Radio, Space, Select } from "antd";

  const { RangePicker } = DatePicker;

  const Popup = ({ onShowTable, onRangePickerChange }) => {
    const [open, setOpen] = useState(false);
    const [dateValue, setDateValue] = useState(null);
    const [radioValue, setRadioValue] = useState(1);
    const [outerDate, setOuterDate] = useState(null);
    const [selectValue, setSelectValue] = useState(null); // Added state for Select value

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

    const onDatePickerChange = (date, dateString) => {
      if (radioValue === 1) {
        handleSelectChange(dateString); // Pass the selected value to handleSelectChange
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
      setSelectValue(value); // Update the Select value state
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
                  dropdownClassName="custom-dropdown" // Add this line if needed
                 
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
