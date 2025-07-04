import React, { useEffect } from "react";
import "./Banner.scss";
import "aos/dist/aos.css";
import bannerImg from "../../assets/images/banner-img2.png"; // Adjust path as needed
import AOS from 'aos';

const Banner: React.FC = () => {
    useEffect(() => {
        AOS.init({ once: true });
    }, []);
    return (
        <section className="software-banner-area">
            <div className="banner-container">
                <div className="banner-content">
                    <div
                        className="text-content"
                        data-aos="fade-in"
                        data-aos-duration="1000"
                    >
                        <h2
                            className="heading"
                            data-aos="fade-in"
                            data-aos-duration="1000"
                            data-aos-delay="200"
                        >
                            Build Trust with Transparent ESG Reporting
                        </h2>
                        <p
                            className="description"
                            data-aos="fade-in"
                            data-aos-duration="1000"
                            data-aos-delay="300"
                        >
                            Leverage blockchain technology for tamper-proof, BRSR-compliant
                            sustainability disclosures.
                        </p>
                        <a
                            href="#"
                            className="software-btn"
                            data-aos="fade-in"
                            data-aos-duration="1000"
                            data-aos-delay="400"
                        >
                            Get Started <i className="fa-solid fa-angles-right"></i>
                        </a>
                    </div>

                    <div
                        className="image-content"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                    >
                        <img src={bannerImg} alt="Banner" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
