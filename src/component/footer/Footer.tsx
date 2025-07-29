import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/Aeiforo-logo.png';
import './Footer.scss';
import AOS from 'aos';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    useEffect(() => {
        AOS.init({ once: true });
    }, []);
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__grid">
                    <div className="footer__column footer__about">
                        <div className="footer__logo">
                            <Link to="/">
                                <img src={logo} alt="Aeiforo Logo" width={150} height={40} />
                            </Link>
                        </div>
                        <p className="footer__description">
                            Innovating sustainability. Guiding change. Empowering organizations with technology for a greener future.
                            Simplifying sustainability, one solution at a time.
                        </p>
                        <ul className="footer__social">
                            <li className="footer__social-item">
                                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                            </li>
                            <li className="footer__social-item">
                                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-twitter"></i>
                                </a>
                            </li>
                            <li className="footer__social-item">
                                <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </li>
                            <li className="footer__social-item">
                                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="footer__column">
                        <h3 className="footer__title">Explore</h3>
                        <ul className="footer__links">
                            <li className="footer__link-item">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="footer__link-item">
                                <Link to="/">About</Link>
                            </li>
                            <li className="footer__link-item">
                                <Link to="/">Services</Link>
                            </li>
                            <li className="footer__link-item">
                                <Link to="/">Portfolio</Link>
                            </li>
                            <li className="footer__link-item">
                                <Link to="/">Team</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="footer__column">
                        <h3 className="footer__title">Quick Links</h3>
                        <ul className="footer__links">
                            <li className="footer__link-item">
                                <Link to="/contact">Contact Us</Link>
                            </li>
                            <li className="footer__link-item">
                                <Link to="/pricing">Pricing</Link>
                            </li>
                            <li className="footer__link-item">
                                <Link to="/faq">FAQ</Link>
                            </li>
                            <li className="footer__link-item">
                                <Link to="/privacy-policy">Privacy Policy</Link>
                            </li>
                            <li className="footer__link-item">
                                <Link to="/terms">Terms & Conditions</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4 - Contact Info */}
                    <div className="footer__column">
                        <h3 className="footer__title">Get in Touch</h3>
                        <ul className="footer__contact">
                            <li className="footer__contact-item">
                                <i className="fas fa-location-dot"></i>
                                <span>London, UK / Dubai, UAE / Chennai, India</span>
                            </li>
                            <li className="footer__contact-item">
                                <i className="fas fa-headset"></i>
                                <div>
                                    <a href="tel:+324-9442-515">+44 -07720216021</a>
                                    <br />
                                    <a href="tel:+324-9442-515">+ 91 8807455190</a>
                                    <br />
                                    <a href="tel:+324-9442-515">+971 508056586</a>
                                </div>
                            </li>
                            <li className="footer__contact-item">
                                <i className="fas fa-envelope"></i>
                                <div>
                                    <a href="mailto:hello@aeiforo.com">vijay.subramanian@aeiforo.co.uk</a>
                                    <br />
                                    <a href="mailto:support@aeiforo.com">support@aeiforo.com</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer__copyright">
                    <p>
                        Copyright &copy; {currentYear} Aeiforo. All Rights Reserved
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;