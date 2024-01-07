import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import data from "../data";
import { Button, Card, Col, Row, Carousel } from "antd";
import { Helmet } from "react-helmet-async";
import {
  CheckOutlined,
  ArrowLeftOutlined,
  FormOutlined,
} from "@ant-design/icons";

interface ReadmoreProps {
  text: String;
}
const Readmore: React.FC<ReadmoreProps> = ({ text }) => {
  // text = "-".repeat(100);
  const [lessThanThree, setLessThanThree] = useState(true);
  const [showReadMore, setShowReadMore] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      console.log(ref.current.scrollHeight, ref.current.clientHeight);
      // if line > 3, show readmore btn (line-height 22)
      if (ref.current.clientHeight >= 22 * 3) {
        setShowReadMore(true);
      }
    }
  }, [lessThanThree, showReadMore]);

  return (
    <p>
      <span
        className={lessThanThree ? "line-clamp-3" : "line-clamp-5"}
        ref={ref}
      >
        {text}
      </span>
      {showReadMore && (
        <span
          className="text-blue-500 font-medium cursor-pointer hover:text-gray-600 transition-colors duration-300"
          onClick={() => setLessThanThree(!lessThanThree)}
        >
          {lessThanThree ? " Read more" : "  Close"}
        </span>
      )}
    </p>
  );
};

const ArtPage: React.FC = () => {
  const param = useParams();
  const { id } = param;
  const images = Array.from({ length: 4 });
  // console.log(id, typeof id);
  const art = data[parseInt(id ?? "0")];
  return (
    <div className="container">
      <Helmet>
        <title>{art.artName}</title>
      </Helmet>
      <h1>art {id}</h1>
      <Row gutter={[30, 30]} className="justify-between">
        <Col xs={24} md={12} lg={8}>
          <Carousel autoplay className="mb-3 rounded-xl overflow-hidden">
            {images.map((_, i) => (
              <div key={i}>
                <img
                  className="d-block w-100"
                  src={`https://picsum.photos/id/${i * 10}/700/500`}
                  alt={`Image ${i + 1}`}
                  // style={{ maxHeight: "250px" }}
                />
              </div>
            ))}
          </Carousel>
          <Row gutter={[16, 16]} className="mb-4">
            {images.map((_, i) => (
              <Col span={6}>
                <div key={i} className="rounded-lg overflow-hidden">
                  <img
                    className="d-block w-100"
                    src={`https://picsum.photos/id/${i * 10}/500/350`}
                    alt={`Image ${i + 1}`}
                    // style={{ maxHeight: "250px" }}
                  />
                </div>
              </Col>
            ))}
          </Row>
          <div className="text-center text-blue-900 text-lg font-medium mb-3">
            {"1 / 4"}
          </div>
          <div>
            <ul>
              <li className="flex space-x-2 mb-3">
                <span>
                  <CheckOutlined />
                </span>
                <span>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Voluptate velit quibusdam qui placeat magni. Pariatur nostrum
                  a recusandae consequatur dolorem.
                </span>
              </li>
              <li className="flex space-x-2 mb-3">
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
              <Col span={5} className="text-gray-500">
                Category:
              </Col>
              <Col span={19}>{art.category}</Col>

              <Col span={5} className="text-gray-500">
                Start Date:
              </Col>
              <Col span={19}>{art.startDate}</Col>

              <Col span={5} className="text-gray-500">
                End Date:
              </Col>
              <Col span={19}>{art.endDate}</Col>
            </Row>

            <div className="mb-3">
              <h3>License Owner</h3>
              <Card>
                <p>Lorem, ipsum dolor.</p>
                <p>999-999-9999</p>
                <p>example@email.com</p>
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
