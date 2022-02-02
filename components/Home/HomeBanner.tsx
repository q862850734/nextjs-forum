import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import { Box } from "@mui/material";
import Image from "next/image";
import "swiper/css";
import { NexusGenFieldTypes } from "../../@types/nexus-typegen";

export default function HomeBanners({ data }) {
  return (
    <Swiper
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      loop
    >
      {data.map((x: NexusGenFieldTypes["Banner"]) => (
        <SwiperSlide key={x.image}>
          <Box
            sx={{
              width: "300px",
              height: "200px",
            }}
          >
            <Image layout="fill" src={x.image} />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
