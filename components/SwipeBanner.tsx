import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import { Box } from "@mui/material";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { NexusGenFieldTypes } from "../@types/nexus-typegen";

export default function SwipeBanner({ banners, delay = 3500, option = {} }) {
  console.log(banners);

  return (
    <Swiper
      style={{ width: "100%", height: "100%" }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{
        delay,
        disableOnInteraction: false,
      }}
      loop
    >
      {banners.map((x: NexusGenFieldTypes["Banner"]) => (
        <SwiperSlide key={x.image}>
          <Image
            layout="fill"
            objectFit="contain"
            src={x.image}
            alt={x.name}
            title={x.description || ""}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
