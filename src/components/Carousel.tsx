import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface Props {
  images: number[];
}

const Carousel: React.FC<Props> = ({ images }) => {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      nextSlide();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [slide]);

  const nextSlide = () => {
    // setSlide(slide === images.length - 1 ? 0 : slide + 1);
    setSlide((slide + 1) % images.length);
  };
  const prevSlide = () => {
    // setSlide(slide === 0 ? images.length - 1 : slide - 1);
    setSlide((slide - 1 + images.length) % images.length);
  };

  const goToSlide = (slide: number) => {
    setSlide(slide);
  };

  return (
    <div className="text-center">
      <div className="flex align-center relative mb-4 rounded-lg lg:rounded-2xl mx-auto overflow-hidden bg-black">
        {images.map((num: number, i: number) => (
          <img
            key={num}
            src={`https://picsum.photos/id/${num * 10}/700/500`}
            alt={`image${num}`}
            className={`carousel-item fade ${slide === i ? "" : "hidden"}`}
          />
        ))}
        <LeftOutlined
          className="arrow absolute z-90 top-1/2 left-0 p-3 rounded-r-lg translate-y-50 text-white text-2xl opacity-75 hover:opacity-100"
          onClick={() => {
            prevSlide();
          }}
        />

        <RightOutlined
          className="arrow absolute z-90 top-1/2 right-0 p-3 rounded-l-lg translate-y-50 text-white text-2xl opacity-75 hover:opacity-100"
          onClick={() => {
            nextSlide();
          }}
        />
        <span className="z-90 absolute bottom-4 flex justify-center space-x-2 left-1/2 translate-x-50 cursor-pointer">
          {images.map((num: number, i: number) => (
            <span
              key={num}
              className={`opacity-50 ${slide == num ? "text-white" : ""}`}
              onClick={() => {
                goToSlide(i);
              }}
            >
              ⬤
            </span>
          ))}
        </span>
      </div>

      <Row gutter={16} className="mb-4">
        {images.map((num: number, i: number) => (
          <Col span={6} key={num}>
            <div className="rounded-md xl:round-xl overflow-hidden opacity-75 hover:opacity-100 hover:scale-110 cursor-pointer transition duration-300">
              <img
                className="d-block w-100"
                src={`https://picsum.photos/id/${num * 10}/500/300`}
                alt={`Image ${num + 1}`}
                onClick={() => goToSlide(i)}
              />
            </div>
          </Col>
        ))}
      </Row>
      <div className="text-center text-blue-900 text-lg font-medium mb-3">
        {slide + 1} / 4
      </div>
    </div>
  );
};

export default Carousel;
