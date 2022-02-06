import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import { memo } from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { NexusGenFieldTypes } from "../@types/nexus-typegen";
import { Banner } from "@prisma/client";

interface Props {
  banners: Banner[];
  delay?: number;
}

const SwipeBanner = memo(function Swipe({ banners, delay = 3500 }: Props) {
  return (
    <Swiper
      style={{ width: "100%", height: "100%" }}
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
});

export default SwipeBanner;
