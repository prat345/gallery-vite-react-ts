import React from "react";
import { Link, useParams } from "react-router-dom";
import data from "../data";
import { Button, Card, Col, Row } from "antd";
import { Helmet } from "react-helmet-async";
import {
  CheckOutlined,
  ArrowLeftOutlined,
  FormOutlined,
} from "@ant-design/icons";

import CarouselAntd from "../components/CarouselAntd";
import Readmore from "../components/Readmore";

const ArtPage: React.FC = () => {
  const param = useParams();
  const { id } = param;
  // console.log(id, typeof id);
  const art = data[parseInt(id ?? "0")];

  return (
    <div className="container">
      <Helmet>
        <title>{art.artName}</title>
      </Helmet>
      <Row gutter={[30, 30]} className="justify-between">
        <Col xs={24} md={12} lg={8}>
          <CarouselAntd images={art.images} />
          <div className="description">
            <ul>
              <li className="flex space-x-2 mb-3 text-blue-900">
                <span>
                  <CheckOutlined />
                </span>
                <span>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Voluptate velit quibusdam qui placeat magni. Pariatur nostrum
                  a recusandae consequatur dolorem.
                </span>
              </li>
              <li className="flex space-x-2 mb-3 text-blue-900">
                <span>
                  <CheckOutlined />
                </span>
                <span>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Possimus, magni?
                </span>
              </li>
            </ul>
          </div>
        </Col>
        <Col xs={24} md={12} lg={14}>
          <Card className="pb-10">
            <h2>{art.artName}</h2>
            <Row gutter={[16, 16]} className="mb-3">
              <Col span={5}>Category:</Col>
              <Col span={19} className="font-medium text-blue-900">
                {art.category}
              </Col>
              <Col span={5}>Start Date:</Col>
              <Col span={19} className="font-medium text-blue-900">
                {art.status && art.startDate}
              </Col>
              <Col span={5}>End Date:</Col>
              <Col span={19} className="font-medium text-blue-900">
                {" "}
                {art.status && art.endDate}
              </Col>
            </Row>

            <div className="mb-3">
              <h3>Owner</h3>
              <Card>
                <h3>Lorem, ipsum dolor.</h3>
                <p>
                  <span>Phone: </span>
                  <span className="font-medium text-blue-900">
                    999-999-9999
                  </span>
                </p>
                <p>
                  <span>Email: </span>
                  <span className="font-medium text-blue-900">
                    example@email.com
                  </span>
                </p>
              </Card>
            </div>

            <div>
              <h3>Detail</h3>
              <Readmore
                text={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid delectus id odit minus voluptate dolores consectetur quidem quasi incidunt similique debitis eius qui porro sequi aspernatur, voluptas est vitae ducimus odio suscipit? Ipsa inventore quaerat quod laudantium laborum, cum sint. Esse ea itaque dolore eius consectetur quidem voluptate, nihil temporibus."
                }
              />
            </div>

            <div className="absolute top-5 right-5 flex space-x-3">
              <p>
                <Link to={`/`}>
                  <Button icon={<ArrowLeftOutlined />} shape="circle"></Button>
                </Link>
              </p>
              <p>
                <Link to={`/edit/${id}`}>
                  <Button icon={<FormOutlined />} shape="circle"></Button>
                </Link>
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ArtPage;
