import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import Axios from 'utils/axios';
import { BASE_URL } from 'config';
// Import Swiper styles
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

SwiperCore.use([Autoplay]);

interface AdvertisementProps {
    title: string;
    uri: string;
    status: boolean;
}

export default function Advertisement() {
    const [advertisements, setAdvertisements] = useState<AdvertisementProps[]>([]);

    useEffect(() => {
        Axios.post('api/v3/advertisements/list', {}).then(({ data }) => {
            setAdvertisements(data.results);
        });
    }, []);

    return (
        <Box
            sx={{
                height: '120px',
                marginTop: '-10px',
                marginBottom: '10px'
            }}
        >
            <Swiper
                pagination={{
                    dynamicBullets: true
                }}
                loop
                autoplay={{ delay: 5000 }}
                className="mySwiper"
            >
                {advertisements.map((aditem, index) => (
                    <SwiperSlide key={index}>
                        <img src={`${BASE_URL}/${aditem.uri}`} alt={aditem.title} style={{ height: '120px', width: '100%' }} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
}