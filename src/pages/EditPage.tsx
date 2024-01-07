import React from "react";
import { useParams } from "react-router-dom";
import data from "../data";
// import Card from "react-bootstrap/Card";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import type { DatePickerProps } from "antd";
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Radio,
  DatePicker,
  Button,
  Select,
  Divider,
} from "antd";
import { Helmet } from "react-helmet-async";

const { Option } = Select;
const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  console.log(date, dateString);
};

const onFinish = (values: any) => {
  // Handle form submission here
  console.log("Received values:", values);
};

const EditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const art = data[parseInt(id ?? "0", 10)];

  return (
    <div className="container">
      <Helmet>
        <title>Edit - {art.artName}</title>
      </Helmet>
      <h1>Edit display options</h1>
      <Form onFinish={onFinish} layout="vertical">
        <Card className="mb-3">
          <h2>{art.artName}</h2>
          <>
            <Form.Item
              name="gender"
              label="Category"
              wrapperCol={{ span: 12, offset: 0 }}
              rules={[{ required: true, message: "Please select gender!" }]}
            >
              <Select placeholder="select your gender">
                <Option value="painting">Painting</Option>
                <Option value="literature">Literature</Option>
                <Option value="media">Media</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please enter your name" },
                  ]}
                >
                  <Input placeholder="Name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number",
                    },
                  ]}
                >
                  <Input placeholder="Phone Number" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please enter your email",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </Col>
            </Row>
          </>
        </Card>

        <Card>
          <>
            <h2>Art Detail</h2>
            <Divider />
            <Row>
              <Col span={12}>
                <Form.Item label="Choose to display" name="display" rules={[]}>
                  <Radio.Group>
                    <Radio value={false}>Don't display</Radio>
                    <Radio value={true}>Display</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Start Date"
                  name="start-date"
                  rules={[
                    { required: true, message: "Please enter start date" },
                  ]}
                >
                  <DatePicker onChange={onChange} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="End Date"
                  name="end-date"
                  rules={[{ required: true, message: "Please enter end date" }]}
                >
                  <DatePicker onChange={onChange} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item label="Remark" name="remark" rules={[]}>
                  <Input.TextArea
                    placeholder="For more information. Contact example@email.com"
                    rows={4}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button htmlType="submit">Submit</Button>
            </Form.Item>
          </>
        </Card>
      </Form>
    </div>
  );
};

export default EditPage;
