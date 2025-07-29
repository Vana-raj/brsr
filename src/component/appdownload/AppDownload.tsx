import React, { useEffect } from "react";
import "./AppDownload.scss";

import appDownload from "../../assets/images/app-download.png";
import playStore from "../../assets/images/play-store.png";
import appleStore from "../../assets/images/apple-store.png";
import AOS from "aos";
interface AppDownloadProps {
    // Add any props here if needed
}
const AppDownload: React.FC<AppDownloadProps> = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);
    return (
        <div className="software-app-download-area ptb-100 overflow-hidden">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <div
                            className="software-app-download-image"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                        >
                            <img
                                src={appDownload}
                                alt="app Download"
                                className="animate__animated animate__fadeInUp"
                            />
                            <div className="circle"></div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-12">
                        <div className="software-app-download-content">
                            <span
                                className="sub-title"
                                data-aos="fade-in"
                                data-aos-duration="1000"
                                data-aos-delay="100"
                            >
                                <i className="flaticon-download"></i> Download App
                            </span>

                            <h2
                                data-aos="fade-in"
                                data-aos-duration="1000"
                                data-aos-delay="200"
                            >
                                Let's get your free copy from Apple and Play store
                            </h2>

                            <p
                                data-aos="fade-in"
                                data-aos-duration="1000"
                                data-aos-delay="300"
                            >
                                Lorem Ipsum is simply dummy text of the printing and
                                typesetting industry.
                            </p>

                            <div
                                className="btn-box"
                                data-aos="fade-in"
                                data-aos-duration="1000"
                                data-aos-delay="400"
                            >
                                <a
                                    href="https://play.google.com/store/apps"
                                    className="playstore-btn"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img
                                        src={playStore}
                                        alt="Play Store"
                                        className="icon"
                                    />
                                    <div className="text">
                                        Get It On
                                        <span>Google Play</span>
                                    </div>
                                </a>

                                <a
                                    href="https://www.apple.com/itunes/"
                                    className="applestore-btn"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img
                                        src={appleStore}
                                        alt="Apple Store"
                                        className="icon"
                                    />
                                    <div className="text">
                                        Download on the
                                        <span>Apple Store</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppDownload;
