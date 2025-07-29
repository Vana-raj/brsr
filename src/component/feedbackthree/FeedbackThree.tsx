import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import clientImg1 from "../../assets/images/client1.png";
import clientImg2 from "../../assets/images/client2.png";
import clientImg3 from "../../assets/images/client3.png";
import clientImg4 from "../../assets/images/client4.png";
import clientImg5 from "../../assets/images/client5.png";
import clientImg6 from "../../assets/images/client6.png";
import clientImg7 from "../../assets/images/client7.png";
import clientImg8 from "../../assets/images/client8.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./FeedbackThree.scss";

interface RatingItem {
    iconName: string;
}

interface FeedbackItem {
    name: string;
    designation: string;
    feedbackText: string;
    rating: RatingItem[];
}

const feedbackData: FeedbackItem[] = [
    {
        name: "John Smith",
        designation: "CEO & Founder, Envato",
        feedbackText:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
        rating: [
            { iconName: "fa-solid fa-star" },
            { iconName: "fa-solid fa-star" },
            { iconName: "fa-solid fa-star" },
            { iconName: "fa-solid fa-star" },
            { iconName: "fa-solid fa-star" },
        ],
    },
    {
        name: "Oliver Smith",
        designation: "React JS Specialist",
        feedbackText:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
        rating: [
            { iconName: "fa-solid fa-star" },
            { iconName: "fa-solid fa-star" },
            { iconName: "fa-solid fa-star" },
            { iconName: "fa-solid fa-star" },
            { iconName: "fa-solid fa-star" },
        ],
    },
    {
        name: "Thomas John",
        designation: "Angular JS Specialist",
        feedbackText:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
        rating: [
            { iconName: "fa-solid fa-star" },
            { iconName: "fa-solid fa-star" },
            { iconName: "fa-solid fa-star" },
            { iconName: "fa-solid fa-star" },
            { iconName: "fa-solid fa-star" },
        ],
    },
];

const FeedbackThree: React.FC = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }, []);
    return (
        <div className="feedback-area feedback-style-3 ptb-100">
            <div className="container">
                <div className="section-title white-color">
                    <h2>Trusted by Users</h2>
                </div>

                <div className="feedback-list">
                    <Swiper
                        autoHeight={true}
                        pagination={{
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: true,
                            pauseOnMouseEnter: true,
                        }}
                        slidesPerView={1}
                        modules={[Autoplay, Pagination]}
                        className="feedback-slides"
                    >
                        {feedbackData.map((value, i) => (
                            <SwiperSlide key={i}>
                                <div className="single-feedback">
                                    <div className="rating">
                                        {value.rating.map((value, i) => (
                                            <i className={value.iconName} key={i}></i>
                                        ))}
                                    </div>

                                    <p><q>{value.feedbackText}</q></p>

                                    <div className="bar"></div>

                                    <h3>{value.name}</h3>
                                    <span>{value.designation}</span>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* Client image */}
            <div className="client-image-box">
                <img
                    src={clientImg1}
                    className="client1"
                    alt="client"
                    data-aos="fade-in"
                    data-aos-duration="1000"
                    data-aos-delay="200"
                />

                <img
                    src={clientImg2}
                    className="client2"
                    alt="client"
                    data-aos="fade-in"
                    data-aos-duration="1000"
                    data-aos-delay="300"
                />

                <img
                    src={clientImg3}
                    className="client3"
                    alt="client"
                    data-aos="fade-in"
                    data-aos-duration="1000"
                    data-aos-delay="400"
                />

                <img
                    src={clientImg4}
                    className="client4"
                    alt="client"
                    data-aos="fade-in"
                    data-aos-duration="1000"
                    data-aos-delay="500"
                />

                <img
                    src={clientImg5}
                    className="client5"
                    alt="client"
                    data-aos="fade-in"
                    data-aos-duration="1000"
                    data-aos-delay="600"
                />

                <img
                    src={clientImg6}
                    className="client6"
                    alt="client"
                    data-aos="fade-in"
                    data-aos-duration="1000"
                    data-aos-delay="700"
                />

                <img
                    src={clientImg7}
                    className="client7"
                    alt="client"
                    data-aos="fade-in"
                    data-aos-duration="1000"
                    data-aos-delay="800"
                />

                <img
                    src={clientImg8}
                    className="client8"
                    alt="client"
                    data-aos="fade-in"
                    data-aos-duration="1000"
                    data-aos-delay="900"
                />
            </div>
        </div>
    );
};

export default FeedbackThree;
