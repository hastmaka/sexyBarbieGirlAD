// material
// import Swiper core and required modules
import {Swiper, SwiperSlide} from 'swiper/react';
import {A11y, FreeMode, Navigation, Pagination, Thumbs, Zoom, Lazy, Controller} from 'swiper';
// Import Swiper styles
import 'swiper/css';
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/zoom";
import "swiper/css/lazy";
import "swiper/css/thumbs";
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import EzProductCard from "../EzProductCard/EzProductCard";

//----------------------------------------------------------------

export default function EzSwiper({data, show, freeMode, allowTouchMove = false, ...others}) {

    const slides = [];
        data.map(item => {
            return slides.push(
                <SwiperSlide key={item.id}>
                    {show ? item.el : <EzProductCard
                        product={item}
                    />}
                </SwiperSlide>
            )
        })
    return (
        <Swiper
            freeMode={freeMode}
            grabCursor={true}
            allowTouchMove={allowTouchMove}
            modules={[FreeMode, A11y, Navigation, Pagination, Thumbs, Zoom, Lazy, Controller]}
            {...others}
        >
            {slides}
        </Swiper>
    );
}
