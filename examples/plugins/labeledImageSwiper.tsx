import type { CellPlugin } from '@react-page/editor';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Typography } from '@mui/material';
import React from 'react';

const labeledImageSwiper: CellPlugin<{
  loop: boolean;
  height: number;
  borderRadius: number;
  slides: {
    id: number;
    name: string;
    image: string;
  }[];
}> = {
  id: 'labeled-image-swiper-plugin',
  title: 'Labeled image swiper plugin',
  description: 'Some Labeled image swiper plugin',
  version: 1,
  Renderer: ({ children, data }: any) => {
    return (
      <div
        style={{
          maxWidth: '100vw',
        }}
      >
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          loop={data.loop}
          modules={[Navigation]}
        >
          {data.slides?.map(({ id, name, image }: any) => (
            <SwiperSlide key={id} style={{ height: `${data.height}px` }}>
              <div
                style={{
                  height: `${data.height}px`,
                  width: '100%',
                  borderRadius: `${data.borderRadius}px`,
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                }}
              >
                <Typography
                  variant="h4"
                  style={{
                    color: 'white',
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                  }}
                >
                  {name}
                </Typography>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  },
  controls: {
    type: 'autoform',
    columnCount: 1,
    schema: {
      properties: {
        loop: {
          type: 'boolean',
          default: true,
        },
        height: {
          type: 'number',
          default: 500,
        },
        borderRadius: {
          type: 'number',
          default: 8,
        },
        slides: {
          type: 'array',
          items: {
            type: 'object',
            default: {
              id: 1,
              name: 'Product name',
              image: 'https://api.lorem.space/image/furniture?w=1920&h=500',
            },
            required: [],
            properties: {
              id: {
                type: 'number',
              },
              name: {
                type: 'string',
              },
              image: {
                type: 'string',
              },
            },
          },
        },
      },
      required: [],
    },
  },
};

export default labeledImageSwiper;
