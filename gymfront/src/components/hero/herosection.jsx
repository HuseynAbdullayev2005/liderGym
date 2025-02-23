import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Link } from 'react-router-dom';
import './Herosection.css';

const Herosection = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
    >
      <SwiperSlide>
        <div className="slide">
          <img src="https://supplymaster.store/cdn/shop/collections/desktop-wallpaper-dumbbells-weight-a-healthy-lifestyle-sports-equipment-fitness-equipment_1.jpg?v=1681978125&width=1296" alt="Slide 1" />
          <div className="overlay">
            <h2>GYM SHOPPING</h2>
            <Link to="/shopping" className="btn">Go To Shop</Link>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slide">
          <img src="https://hips.hearstapps.com/hmg-prod/images/killing-that-kettlebell-workout-royalty-free-image-637772778-1562688657.jpg" alt="Slide 2" />
          <div className="overlay">
            <h2>MAKE RANDOM WORKOUT</h2>
            <Link to="/workouts" className="btn">Go To Workouts</Link>
          </div>
        </div>
      </SwiperSlide>
      {/* Ekstra slide'lar için aşağıdaki yorum satırını kaldırabilirsiniz.
      <SwiperSlide>
        <div className="slide">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbiDgSYGj5Ye8lCQ1K-bldScitJ1SvTfX4yA&s" alt="Slide 3" />
          <div className="overlay">
            <h2>CHECK THE PACKAGE</h2>
            <Link to="/package" className="btn">See Packages</Link>
          </div>
        </div>
      </SwiperSlide> */}
    </Swiper>
  );
};

export default Herosection;
