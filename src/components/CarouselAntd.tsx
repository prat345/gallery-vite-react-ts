import React, { useEffect, useRef, useState } from "react";
import { Col, Row, Carousel } from "antd";
import { CarouselRef } from "antd/es/carousel";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface CarouselAntdProps {
  images: number[];
}

const CarouselAntd: React.FC<CarouselAntdProps> = ({ images }) => {
  const [slide, setSlide] = useState(0);
  const ref = useRef<CarouselRef | null>(null);
  console.log(images);
  useEffect(() => {
    const timeout = setTimeout(() => {
      nextSlide();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [slide]);

  const prevSlide = () => {
    if (ref.current) {
      ref.current.prev();
      setSlide(slide === 0 ? images.length - 1 : slide - 1);
    }
  };
  const nextSlide = () => {
    if (ref.current) {
      ref.current.next();
      setSlide(slide === images.length - 1 ? 0 : slide + 1);
    }
  };
  const goToSlide = (i: number) => {
    if (ref.current) {
      ref.current.goTo(i);
      setSlide(i);
    }
  };

  return (
    <>
      <div className="carousel-container relative">
        <LeftOutlined
          className="absolute top-1/2 left-0 p-3 translate-y-50 text-white text-2xl opacity-75 hover:opacity-100 transition-all duration-200"
          style={{ zIndex: "90" }}
          onClick={() => {
            prevSlide();
          }}
        />

        <RightOutlined
          className="absolute top-1/2 right-0 p-3 translate-y-50 text-white text-2xl opacity-75 hover:opacity-100 transition-all duration-200"
          style={{ zIndex: "90" }}
          onClick={() => {
            nextSlide();
          }}
        />
        <Carousel
          autoplay={false}
          dots
          pauseOnHover
          draggable={false}
          ref={ref}
          className="mb-3 rounded-xl overflow-hidden"
        >
          {images.map((num: number, _i) => (
            <div key={num}>
              <img
                className="d-block w-100"
                src={`https://picsum.photos/id/${num * 10}/700/500`}
                alt={`Image ${num + 1}`}
              />
            </div>
          ))}
        </Carousel>
      </div>

      <Row gutter={16} className="mb-4">
        {images.map((num: number, i) => (
          <Col span={6} key={num}>
            <div className="rounded-lg overflow-hidden opacity-75 hover:opacity-100 hover:scale-110 cursor-pointer transition duration-300">
              <img
                className="d-block w-100"
                src={`https://picsum.photos/id/${num * 10}/500/350`}
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
    </>
  );
};

export default CarouselAntd;
