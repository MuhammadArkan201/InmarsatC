import { Select } from "antd";


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
              { value: 'Fucino', label: 'Fucino' },
              { value: 'Paumalu', label: 'Paumalu' },
              { value: 'Perth', label: 'Perth' },
            ]}
          />
      
    </div>
  )
}

export default TerminalLoc
