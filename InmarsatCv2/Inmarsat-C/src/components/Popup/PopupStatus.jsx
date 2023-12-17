import React, { useState } from "react";
import { Button, Modal, Select } from "antd";
import PropTypes from "prop-types";
import "../Pages/TestTerminal/TabPages/StatusTab/PopupStatus.css";

const PopupStatus = ({
  handleSelectChange,
  updatePreferredOcean,
  preferredOcean,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(preferredOcean || "");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      // First API call
      const cmdFirstAPI = "set o-" + selectedOption.charAt(0);

      const responseFirstAPI = await fetch(
        `https://655c2821ab37729791a9ef77.mockapi.io/api/v1/command?dest=9`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cmd: cmdFirstAPI }),
        }
      );

      if (!responseFirstAPI.ok) {
        throw new Error(`Network response was not ok: ${responseFirstAPI.status}`);
      }

      const firstResponseData = await responseFirstAPI.json();

      // Second API call
      const cmdSecondAPI = selectedOption.value; // Assuming selectedOption.value is "ncs -g 44 | 11080"

      const responseSecondAPI = await fetch(
        "https://655c2821ab37729791a9ef77.mockapi.io/api/v1/command?dest=9", // Replace with the actual second endpoint URL
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cmd: cmdSecondAPI }),
        }
      );

      if (!responseSecondAPI.ok) {
        throw new Error(`Network response was not ok: ${responseSecondAPI.status}`);
      }

      const secondResponseData = await responseSecondAPI.json();

      // Update state or perform any other actions with the response data
      updatePreferredOcean({
        selectedOption,
        firstResponseData,
        secondResponseData,
      });

      
    } catch (error) {
      console.error("Error in API request:", error);
    }setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (value, option) => {
    setSelectedOption(option.label);
    handleSelectChange(value, option.label);
  };

  const onApply = () => {
    handleOk();
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
  preferredOcean: PropTypes.string,
};

export default PopupStatus;
