import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../app/(auth)/login/global.css";

const CustomSlider = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

    appendDots: (dots) => (
      <div className='custom-dots-container'>
        <ul className='custom-dots'> {dots} </ul>
      </div>
    ),
  };

  return (
    <div className=''>
      <Slider {...settings}>
        <div className='relative'>
          <img
            src='/images/property.png'
            className='slider-image-div'
            alt='Property'
          />
          <div className='slider-overlay-div'></div>
          <div className='text-content'>
            <h2 className='property-title'>All Home Management Services</h2>
            <p className='property-description'>
              Lorem ipsum dolor sit amet...
            </p>
          </div>
        </div>
        <div className='relative'>
          <img
            src='/images/property.png'
            className='slider-image-div'
            alt='Property'
          />
          <div className='slider-overlay-div'></div>
          <div className='text-content'>
            <h2 className='property-title'>All Home Management Services</h2>
            <p className='property-description'>
              Lorem ipsum dolor sit amet...
            </p>
          </div>
        </div>
        <div className='relative'>
          <img
            src='/images/property.png'
            className='slider-image-div'
            alt='Property'
          />
          <div className='slider-overlay-div'></div>
          <div className='text-content'>
            <h2 className='property-title'>All Home Management Services</h2>
            <p className='property-description'>
              Lorem ipsum dolor sit amet...
            </p>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default CustomSlider;
