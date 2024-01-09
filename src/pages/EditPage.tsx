import React, { FormEvent, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import data from "../data";
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
import dayjs from "dayjs";
import { ArrowLeftOutlined, FileDoneOutlined } from "@ant-design/icons";

const { Option } = Select;

const EditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const art = data[parseInt(id ?? "0", 10)];
  const navigate = useNavigate();

  const [category, setCategory] = useState(art.category);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [display, setDisplay] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [remark, setRemark] = useState("");

  const onFinish = (_e: FormEvent) => {
    const formData = {
      category,
      name,
      phone,
      email,
      display,
      startDate,
      endDate,
      remark,
    };
    setTimeout(() => {
      console.log("Submit: ", formData);
      navigate("/");
    }, 1000);
  };

  return (
    <div className="container">
      <Helmet>
        <title>Edit - {art.artName}</title>
      </Helmet>
      <Form onFinish={onFinish} layout="vertical" autoComplete="off">
        <div className="relative">
          <div className="absolute top-0 right-0 flex space-x-3">
            <div>
              <Link to={`/`}>
                <Button icon={<ArrowLeftOutlined />} shape="circle"></Button>
              </Link>
            </div>
            <div>
              <Form.Item>
                <Button
                  icon={<FileDoneOutlined />}
                  shape="circle"
                  htmlType="submit"
                ></Button>
              </Form.Item>
            </div>
          </div>
          <h3 className="font-bold">Edit display options</h3>
          <Card className="mb-3">
            <h2>{art.artName}</h2>
            <>
              <Row className="mb-3" gutter={100}>
                <Col span={24} sm={12} lg={10}>
                  <Form.Item
                    name="category"
                    label="Category"
                    wrapperCol={{ span: 24, offset: 0 }}
                    rules={[
                      { required: true, message: "Please select Category!" },
                    ]}
                  >
                    <Select
                      placeholder="Select category"
                      value={art.category}
                      onChange={(value) => setCategory(value)}
                    >
                      <Option value="painting">Painting</Option>
                      <Option value="literature">Literature</Option>
                      <Option value="media">Media</Option>
                      <Option value="other">Other</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <h3>Owner</h3>
              <Row gutter={100}>
                <Col span={24} sm={12} lg={10}>
                  <Form.Item
                    label="Name"
                    name="name"
                    wrapperCol={{ span: 24, offset: 0 }}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please enter your name",
                      },
                      {
                        min: 3,
                        max: 20,
                        message: "Name must be between 3-20 characters",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={24} sm={12} lg={10}>
                  <Form.Item
                    label="Phone Number"
                    name="phone"
                    wrapperCol={{ span: 24, offset: 0 }}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please enter your phone number",
                      },
                      {
                        len: 10,
                        message: "Please enter a valid phone number",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Phone Number"
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={100}>
                <Col span={24} sm={12} lg={10}>
                  <Form.Item
                    label="Email"
                    name="email"
                    wrapperCol={{ span: 24, offset: 0 }}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please enter your email",
                      },
                      { type: "email", message: "Please a valid email" },
                    ]}
                  >
                    <Input
                      placeholder="Email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          </Card>

          <Card>
            <>
              <h3 className="font-bold">Art Detail</h3>
              <Divider />
              <Row gutter={100} className="mb-3">
                <Col span={24} lg={10}>
                  <Form.Item
                    label="Choose to display"
                    name="display"
                    rules={[]}
                  >
                    <Radio.Group
                      defaultValue={true}
                      value={art.status}
                      onChange={(e) => {
                        setDisplay(e.target.value);
                      }}
                    >
                      <Radio value={true}>Display</Radio>
                      <Radio value={false}>Don't display</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                  <Row gutter={30}>
                    <Col span={12}>
                      <Form.Item
                        label="Start Date"
                        name="startDate"
                        wrapperCol={{ span: 24, offset: 0 }}
                        rules={[
                          {
                            required: true,
                            message: "Please enter start date",
                          },
                        ]}
                      >
                        <DatePicker
                          className="w-full"
                          format="YYYY-MM-DD"
                          onChange={(_date, dateString) => {
                            setStartDate(dateString);
                          }}
                          value={dayjs(art.startDate)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="End Date"
                        name="endDate"
                        wrapperCol={{ span: 24, offset: 0 }}
                        rules={[
                          { required: true, message: "Please enter end date" },
                        ]}
                      >
                        <DatePicker
                          className="w-full"
                          format="YYYY-MM-DD"
                          onChange={(_date, dateString) => {
                            setEndDate(dateString);
                          }}
                          value={dayjs(art.startDate)}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item label="Remark" name="remark" rules={[]}>
                    <Input.TextArea
                      placeholder="For more information. Contact example@email.com"
                      rows={4}
                      onChange={(e) => {
                        setRemark(e.target.value);
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          </Card>
        </div>
      </Form>
    </div>
  );
};

export default EditPage;
