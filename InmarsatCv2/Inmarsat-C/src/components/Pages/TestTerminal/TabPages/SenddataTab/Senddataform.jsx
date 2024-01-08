import React, { useEffect } from 'react';
import { Form, Input, DatePicker, Checkbox, Button } from 'antd';
import PropTypes from 'prop-types';
import './SenddataTab.css';

function Senddataform({ submitFormWithAxios, loading, onFormSubmit }) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [form]);

  const handleSubmit = async (values) => {
    try {
      const formData = {
        Les_Id: values.Les_Id || '',
        Delivery_service: values.Delivery_service || '',
        Destination_network: values.Destination_network || '',
        Destination_ext: values.Destination_ext || '',
        Language: values.Language || '',
        Date_time: values.Date_time || null,
        Content: values.Content || '',
        distressPriority: values.distressPriority ? 1 : 0,
        requestConfirmation: values.requestConfirmation ? 1 : 0,
      };

      await submitFormWithAxios(formData);

      // Call the callback function passed from the parent component
      onFormSubmit();

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <Form
        onFinish={handleSubmit}
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 21 }}
        className="labelconfig"
      >
        <Form.Item label="LES ID" name="Les_Id">
          <Input
            type="text"
            placeholder="Specifies which LES to route the message."
          />
        </Form.Item>

        <Form.Item label="Delivery Service" name="Delivery_service">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Destination Network" name="Destination_network">
          <Input type="text" placeholder="Terrestrial link to use." />
        </Form.Item>

        <Form.Item label="Destination_ext" name="Destination_ext">
          <Input type="text" placeholder="Additional receiver information." />
        </Form.Item>

        <Form.Item label="Language" name="Language">
          <Input type="text" placeholder="Presentation at the receiving end." />
        </Form.Item>

        <Form.Item label="Date and Time" name="Date_time">
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm"
            placeholder="Set transmission date and time."
          />
        </Form.Item>

        <Form.Item
          label="Data"
          name="Content"
          rules={[
            { required: true, message: "Oh Sorry! content cannot be empty" },
          ]}
        >
          <Input.TextArea rows={2} />
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: 4 }}
          valuePropName="checked"
          initialValue={false}
          name="distressPriority"
          style={{ margin: "0px" }}
        >
          <Checkbox className="checkbox-text">
            Transmit a message with distress priority.
          </Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: 4 }}
          valuePropName="checked"
          initialValue={false}
          name="requestConfirmation"
          style={{ margin: "0px", marginBottom: "24" }}
        >
          <Checkbox className="checkbox-text">
            Request confirmation from the LES on the final delivery from the LES
            to the destination.
          </Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button type="primary" htmlType="submit" loading={loading} className="sumbitformbtn">
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

Senddataform.propTypes = {
  submitFormWithAxios: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default Senddataform;