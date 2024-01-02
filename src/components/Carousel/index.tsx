import * as React from "react";
import Slider from "react-slick";
import { Box, Skeleton } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const image1 = new Image();
    const image2 = new Image();

    const loadImage = (image: HTMLImageElement, src: string) => {
      return new Promise((resolve) => {
        image.src = src;
        image.onload = resolve;
      });
    };

    Promise.all([loadImage(image1, "https://folklof.s3.ap-southeast-1.amazonaws.com/images/carousel-1.webp"), loadImage(image2, "https://folklof.s3.ap-southeast-1.amazonaws.com/images/carousel-2.webp")])
      .then(() => {
        setLoading(false);
      });
  }, []);
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        margin: "5vh 0",
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
        {loading ? (          
          <Skeleton
          variant="rounded"
          height={0}
          sx={{ bgcolor: "#15202B", paddingBottom:"19.5%"}}
          />
        ):(
          <>
            <Slider {...settings}>
              <Box component="div">
                <img src="https://folklof.s3.ap-southeast-1.amazonaws.com/images/carousel-1.webp" alt="Carousel slide 1" />
              </Box>
              <Box component="div">
                <img src="https://folklof.s3.ap-southeast-1.amazonaws.com/images/carousel-2.webp" alt="Carousel slide 2" />
              </Box>
              {/* More slides */}
            </Slider>
          </>
        )}
    </Box>
  );
};

export default Carousel;
