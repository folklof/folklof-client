import * as React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",

    customPaging: (_: number) => (
      <Box
        component="button"
        sx={{
          width: "10px",
          height: "10px",
          backgroundColor: "#fff",
          borderRadius: "50%",
          "&:hover, &:focus": {
            backgroundColor: "#bbb",
          },
          padding: 0,
          margin: "0 5px",
        }}
      />
    ),
  };

  return (
    <Box
      sx={{
        padding: "2vw 7vw",
        width: "98vw",
        ".slick-slider": {
          width: "100%",
        },
        ".slick-list, .slick-track, .slick-slide > div": {
          height: "100%",
        },
        ".slick-slide": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "& div": {
            width: "100%",
          },
          "& img": {
            maxWidth: "100%",
            height: "auto",
            objectFit: "contain",
          },
        },
      }}
    >
      <Slider {...settings}>
        <Box component="div">
          <img src="https://folklof.s3.ap-southeast-1.amazonaws.com/images/carousel-1.webp" alt="Carousel slide 1" />
        </Box>
        <Box component="div">
          <img src="https://folklof.s3.ap-southeast-1.amazonaws.com/images/carousel-2.webp" alt="Carousel slide 2" />
        </Box>
        {/* More slides */}
      </Slider>
    </Box>
  );
};

export default Carousel;
