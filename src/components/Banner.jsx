import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const Banner = () => {
  return (
    <div className="container rounded-lg mx-auto h-[70vh]">
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div
            className="hero w-full mx-auto h-[70vh] object-cover rounded-lg"
            style={{
              backgroundImage:
                "url(  https://images.pexels.com/photos/5029859/pexels-photo-5029859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
            }}
          >
            <div className="hero-overlay  bg-gradient-to-t from-gray-900 rounded-lg to-transparent opacity-70"></div>
            <div className={"hero-content text-center text-white "}>
              <div className="lg:w-1/2">
                <h1 className="mb-5 text-4xl md:text-5xl font-bold text-white font-poppins">
                  Volunteer Opportunities for Positive Impact
                </h1>
                <p className="mb-5 text-xs text-gray-400 ">
                  Welcome to Join Hands, where passion meets purpose! Explore
                  diverse volunteer opportunities that align with your interests
                  and skills, and make a meaningful difference in communities
                  around the globe. Whether you're passionate about
                  environmental conservation, empowering youth, or supporting
                  marginalized groups, there's a volunteering opportunity
                  waiting for you. Join our community of changemakers today and
                  be a part of something bigger than yourself. Together, let's
                  create a brighter future for all.
                </p>
                <button className="btn cursor-pointer text-white font-poppins font-bold bg-pink-500 border-none">
                  Explore More
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="hero w-full mx-auto rounded-lg h-[70vh] object-cover"
            style={{
              backgroundImage:
                "url(https://images.pexels.com/photos/6994833/pexels-photo-6994833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
            }}
          >
            <div className="hero-overlay rounded-lg bg-gradient-to-t from-gray-900  to-transparent opacity-70"></div>
            <div className={"hero-content text-center text-white "}>
              <div className="lg:w-1/2">
                <h1 className="mb-5 text-4xl md:text-5xl font-bold text-white font-poppins">
                  Your Gateway to Purposeful Action
                </h1>
                <p className="mb-5 text-xs text-gray-400 font-poppins">
                  Welcome to Join Hands, where passion meets purpose! Explore
                  diverse volunteer opportunities that align with your interests
                  and skills, and make a meaningful difference in communities
                  around the globe. Whether you're passionate about
                  environmental conservation, empowering youth, or supporting
                  marginalized groups, there's a volunteering opportunity
                  waiting for you. Join our community of changemakers today and
                  be a part of something bigger than yourself. Together, let's
                  create a brighter future for all.
                </p>
                <button className="btn cursor-pointer text-white font-poppins font-bold bg-pink-500 border-none">
                  Explore More
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="hero w-full mx-auto rounded-lg h-[70vh] object-cover"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1616680214084-22670de1bc82?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            }}
          >
            <div className="hero-overlay rounded-lg bg-gradient-to-t from-gray-900  to-transparent opacity-70"></div>
            <div className="hero-content text-center text-white ">
              <div className="lg:w-1/2">
                <h1 className="mb-5 text-4xl md:text-5xl font-bold text-white font-poppins">
                  Explore Volunteer Opportunities
                </h1>
                <p className="mb-5 text-xs text-gray-400 font-poppins">
                  Welcome to Join Hands, where passion meets purpose! Explore
                  diverse volunteer opportunities that align with your interests
                  and skills, and make a meaningful difference in communities
                  around the globe. Whether you're passionate about
                  environmental conservation, empowering youth, or supporting
                  marginalized groups, there's a volunteering opportunity
                  waiting for you. Join our community of changemakers today and
                  be a part of something bigger than yourself. Together, let's
                  create a brighter future for all.
                </p>
                <button className="btn cursor-pointer text-white font-poppins font-bold bg-pink-500 border-none">
                  Explore More
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
