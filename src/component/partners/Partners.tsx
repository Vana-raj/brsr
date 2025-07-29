import React from 'react';
import partner1 from '../../assets/images/codaImg.png';
import partner2 from '../../assets/images/ddimg.png';
import partner3 from '../../assets/images/fmimg.png';
import partner4 from '../../assets/images/earsimg.png';
import './Partners.scss';

const partnersData = [
    { image: partner1, aosDelay: '200' },
    { image: partner2, aosDelay: '300' },
    { image: partner3, aosDelay: '400' },
    { image: partner4, aosDelay: '500' },
];

const Partners: React.FC = () => {
    return (
        <div className="software-partner-area">
            <div className="container">
                <div className="partners-row">
                    <div
                        className="partner-title"
                        data-aos="fade-in"
                        data-aos-duration="1000"
                        data-aos-delay="100"
                    >
                        Trusted by world famous companies:
                    </div>

                    <div className="partner-logos">
                        {partnersData.map((partner: any, index) => (
                            <div
                                key={index}
                                className="partner-item"
                                data-aos="fade-in"
                                data-aos-duration="1000"
                                data-aos-delay={partner.aosDelay}
                            >
                                <img src={partner.image} alt={`Partner ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Partners;
