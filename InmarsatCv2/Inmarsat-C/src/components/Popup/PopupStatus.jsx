// PopupStatus.jsx
import React, { useState } from "react";
import { Button, Modal, Select } from "antd";
import "../Pages/TestTerminal/TabPages/StatusTab/PopupStatus.css";
import PropTypes from "prop-types";

const PopupStatus = ({ handleSelectChange, updatePreferredOcean }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    // Use the updatePreferredOcean function passed from the parent component
    updatePreferredOcean({ selectedOption });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (value, option) => {
    setSelectedOption(option.label);
    handleSelectChange(value, option.label);
  };

  const onApply = async () => {
    try {
      // Fetch first response
      const response1 = await fetch("/datas/statusData/firstresponse.json");
      const data1 = await response1.json();

      // Fetch second response
      const response2 = await fetch("/datas/statusData/secondresponse.json");
      const data2 = await response2.json();

      // Call the updatePreferredOcean function with the selected option and response data
      updatePreferredOcean({
        selectedOption,
        firstResponseData: data1,
        secondResponseData: data2,
      });

      // Close the modal
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error in API request:", error);
      // Handle error if needed
    }
  };

  return (
    <>
      <Select
        className="Preferred"
        id="or"
        placeholder="Preferred Ocean Region"
        onChange={onChange}
        style={{ width: 227 }}
        options={[
          {
            value: "",
            label: "Preferred Ocean Region",
          },
          { value: "W,ncs -g 44 | 11080", label: "West Atlantic" },
          { value: "E,ncs -g 144 | 12580", label: "East Atlantic" },
          { value: "P,ncs -g 244 | 12580", label: "Pacific" },
          { value: "I,ncs -g 344 | 10840", label: "Indian" },
          { value: "N", label: "None" },
        ]}
      />
      <Button className="btn" onClick={showModal}>
        Set Region
      </Button>
      <Modal
        className="stspopup"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        footer={[
          <Button
            className="popupstsbtn"
            key="cancelbtn"
            onClick={handleCancel}
          >
            Cancel
          </Button>,
          <Button
            className="popupstsbtn"
            key="submit"
            type="primary"
            onClick={onApply}
          >
            Confirm
          </Button>,
        ]}
      >
        <p>Are you sure to set the Preferred Ocean Region?</p>
      </Modal>
    </>
  );
};

PopupStatus.propTypes = {
  handleSelectChange: PropTypes.func.isRequired,
  updatePreferredOcean: PropTypes.func.isRequired,
};

export default PopupStatus;
