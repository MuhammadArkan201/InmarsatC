import "../../../../../App.css";
import { DatePicker, Button } from "antd";
import { useState } from "react";
import Modal from "../../../../Popup/Modal";
import SignalLevel from "../SignalTab/SignalLevel";

const { RangePicker } = DatePicker;

const onOk = (value) => {
  console.log("onOk: ", value);
};

function EgcTab() {
  const [setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="contents">
      <div className="content">
        <div className="head-content">EGC Messages</div>
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
        {modalOpen && <Modal setOpenModal={setModalOpen} />}{" "}
        <Button>Submit</Button>{" "}
      </div>
      <div className="content">
        <div className="head-content"></div>
        <div><SignalLevel></SignalLevel></div>
      </div>
    </div>
  );
}

export default EgcTab;
