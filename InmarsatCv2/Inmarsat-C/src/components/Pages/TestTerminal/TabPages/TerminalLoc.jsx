import { Tabs, Typography, Select } from "antd";


const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

function TerminalLoc() {
  return (
    <div>
        <Select
            defaultValue="Batam"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: 'Batam', label: 'Batam' },
              { value: 'Burum', label: 'Burum' },
              { value: 'Yiminghe', label: 'Yiminghe' },
              { value: 'disabled', label: 'Disabled', disabled: true },
            ]}
          />
      
    </div>
  )
}

export default TerminalLoc
