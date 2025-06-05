import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "./LatestNewsSlider.scss";
import BlogImg1 from "../../assets/images/blog/SupplierImage.png";
import BlogImg2 from "../../assets/images/blog/assertImg.png";
import BlogImg3 from "../../assets/images/blog/digitalImg.png";
import BlogImg4 from "../../assets/images/blog/lowcarbonImg.jpg";
import AOS from "aos";

type NewsItem = {
    image: string;
    title: string;
    date: string;
    category: string;
    shortText: string;
    readMoreLink: string;
};

const latestNewsSliderData: NewsItem[] = [
    {
        image: BlogImg1,
        title: "SUPPLIERS SUSTAINABILITY RATINGS",
        date: "Feb 15, 2023",
        category: "Technology",
        shortText:
            "Sustainability throughout the value chain is a tough nut to crack. It requires focused assessments, classes and drives continuous improvement  Our SustainScore for Suppliers leads the way, measuring global sustainability and steering suppliers to achieve shared corporate goals.",
        readMoreLink: "#",
    },
    {
        image: BlogImg2,
        title: "ASSET BASED FINANCED EMISSIONS",
        date: "Feb 16, 2023",
        category: "Agency",
        shortText:
            "Our cutting-edge data quality scoring system boosts transparency across asset classes and drives continuous improvement. It delivers financial institutions a powerful framework for effectively measuring, reporting, and managing financed emissions in line with PCAF standards.",
        readMoreLink: "#",
    },
    {
        image: BlogImg3,
        title: "DIGITAL PASSPORT & SCOPE 3",
        date: "Feb 17, 2023",
        category: "IT Agency",
        shortText:
            "Our digital passport: the ultimate tool for tracking compliance with emissions, carbon credits, biodiversity, waste, water, recycling, energy, transparency, ethics, governance, and other ESG metrics. This cutting-edge solution streamlines supplier collaboration across the value.",
        readMoreLink: "#",
    },
    {
        image: BlogImg4,
        title: "Low Carbon Tech Development ",
        date: "Feb 18, 2023",
        category: "Development",
        shortText:
            "Our cutting-edge data quality scoring system boosts transparency across asset classes and drives continuous improvement.carbon credits, biodiversity ethics and other ESG metrics. It delivers financial institutions a powerful framework for effectively measuring, reporting, and managing financed emissions in line with PCAF standards.",
        readMoreLink: "#",
    },
];

const LatestNewsSlider: React.FC = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <div className="blog-area ptb-100">
            <div className="container">
                <div className="section-title">
                    <h2>Latest News</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>

                <Swiper
                    autoHeight={true}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: true,
                        pauseOnMouseEnter: true,
                    }}
                    spaceBetween={30}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        992: { slidesPerView: 3 },
                    }}
                    modules={[Autoplay, Pagination]}
                    className="blog-slides"
                >
                    {latestNewsSliderData.map((value, i) => (
                        <SwiperSlide key={i}>
                            <div className="single-blog-item">
                                <div className="blog-image">
                                    <a href={value.readMoreLink}>
                                        <img src={value.image} alt="Blog" width={510} height={383} />
                                    </a>
                                    <div className="post-tag">
                                        <a href={value.readMoreLink}>{value.category}</a>
                                    </div>
                                </div>

                                <div className="blog-post-content">
                                    <span className="date">{value.date}</span>
                                    <h3>
                                        <a href={value.readMoreLink}>{value.title}</a>
                                    </h3>
                                    <p>{value.shortText}</p>
                                    <a href={value.readMoreLink} className="read-more-btn">
                                        Read More <i className="fa-solid fa-angles-right"></i>
                                    </a>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default LatestNewsSlider;
