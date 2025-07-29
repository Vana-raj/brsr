import React from "react";
import Navbar from "../../component/homenavbar/HomeNavbar";
import Banner from "../../component/banner/Banner";
import HelpDesk from "../../component/helpdesk/HelpDesk";
import Footer from "../../component/footer/Footer";
import Overview from "../../component/overview/Overview";
import Partners from "../../component/partners/Partners";
import FeedbackThree from "../../component/feedbackthree/FeedbackThree";
import Faq from "../../component/faq/Faq";
import LatestNewsSlider from "../../component/latestnewslider/LatestNewsSlider";
import AppDownload from "../../component/appdownload/AppDownload";

const LandingPage: React.FC = () => {
    return (
        <div>
            <Navbar />
            <Banner />
            <HelpDesk />
            <Overview />
            <Partners />
            <FeedbackThree />
            <Faq />
            <LatestNewsSlider />
            <AppDownload />
            <Footer />
        </div>
    );
};

export default LandingPage;
