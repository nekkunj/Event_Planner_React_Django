import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Slider,
  Select,
  Row,
  Col,
  message,
} from "antd";
import dayjs from "dayjs";
import { getEventTypes, createEvent,updateEvent } from "../api";

const { TextArea } = Input;
const { Option } = Select;

const EventForm = ({ refresh, visible, disablevisible,initialValues }) => {
  const [form] = Form.useForm();
  const [eventTypes, setEventTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      const data = await getEventTypes();
      setEventTypes(data.data);
    };
    fetchTypes();
  }, []);


  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        startDate: dayjs(initialValues.startDate),
        endDate: dayjs(initialValues.endDate),
        duration: Math.ceil(
          dayjs(initialValues.endDate).diff(dayjs(initialValues.startDate), "day")
        ),
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);
  
  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        ...values,
        startDate: values.startDate.format("YYYY-MM-DD"),
        endDate: values.endDate.format("YYYY-MM-DD"),
      };
      if (initialValues?.id) {
        await updateEvent(initialValues.id, payload);
      } else {
        console.log(payload)
        await createEvent(payload);
      }
      refresh();
      disablevisible();
      form.resetFields();
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  const onValuesChange = (changed, all) => {
    const { startDate, endDate, duration } = all;

    // Update duration when dates change
    if (changed.startDate || changed.endDate) {
      if (startDate && endDate && endDate.isAfter(startDate)) {
        const diff = endDate.diff(startDate, "day");
        form.setFieldsValue({ duration: diff });
      }
    }

    // Update end date when duration is changed
    if (changed.duration !== undefined && startDate) {
      const newEnd = startDate.add(duration, "day");
      form.setFieldsValue({ endDate: newEnd });
    }
  };

  const disabledEndDate = (end) => {
    const start = form.getFieldValue("startDate");
    return start && end && end.isBefore(start, "day");
  };
  const disabledStartDate = (start) => {
    const end = form.getFieldValue("endDate");
    return end && start && end.isAfter(end, "day");
  };


  return (
    <>
      <Modal
        open={visible}
        title={initialValues ? "Edit Event" : "Create Event"}
        onCancel={disablevisible}
        onOk={handleCreate}
        okText="Save"
        cancelText="Cancel"
        width={600}
      >
        <Form
          layout="vertical"
          form={form}
          onValuesChange={onValuesChange}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter title for the event" }]}
          >
            <Input placeholder="New Task" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <TextArea rows={3} placeholder="Add description" />
          </Form.Item>

          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: "Please select a type" }]}
          >
            <Select placeholder="Select event type">
              {eventTypes.map((type) => (
                <Option key={type.id} value={type.name}>
                  {type.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="startDate"
                label="Start date"
                rules={[
                  { 
                    required: true, 
                    message: "Start date is required" 
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const end = getFieldValue("endDate");
                      if (!value || !end || value.isBefore(end)) {
                        return Promise.resolve();
                      }
                      return Promise.reject("Start date must be before end date");
                    },
                  }),
                ]}
              >
                <DatePicker format="MM/DD/YYYY" style={{ width: "100%" }} disabledDate={disabledStartDate}/>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="endDate"
                label="End date"
                rules={[
                  {
                    required: true,
                    message: "End date is required",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const start = getFieldValue("startDate");
                      if (!value || !start || value.isAfter(start)) {
                        return Promise.resolve();
                      }
                      return Promise.reject("End date must be after start date");
                    },
                  }),
                ]}
              >
                <DatePicker
                  format="MM/DD/YYYY"
                  style={{ width: "100%" }}
                  disabledDate={disabledEndDate}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="duration" label="Duration (days)">
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="progress" label={`Progress`}>
            <Slider min={0} max={100} tooltip={{ open: true }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EventForm;
