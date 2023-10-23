import "../../App.css";
import { DatePicker, Button } from "antd";
import { useState } from "react";
import Modal from "./Modal";

const { RangePicker } = DatePicker;

const onChange = (value, dateString) => {
  console.log("Selected Time: ", value);
  console.log("Formatted Selected Time: ", dateString);
};

const onOk = (value) => {
  console.log("onOk: ", value);
};

function DatePickerPopup() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <button
        className="openModalBtn"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <RangePicker
          showTime={{
            format: "HH:mm",
          }}
          format="YYYY-MM-DD HH:mm"
          onChange={onChange}
          onOk={onOk}
          open={false}
        />
      </button>
      {modalOpen && <Modal setOpenModal={setModalOpen} />}
      <Button style={{ marginLeft: '4px' }}>Submit</Button>
    </div>
  );
}

export default DatePickerPopup;
