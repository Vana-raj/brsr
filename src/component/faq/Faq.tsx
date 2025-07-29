import React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import "./Faq.scss";
import faqImg from "../../assets/images/faq-img.png";

const Faq: React.FC = () => {
    return (
        <div className="faq-section">
            <div className="container">
                <div className="section-title">
                    <span className="sub-title">Frequently Ask &amp; Question</span>
                    <h2>Dedicated to help anything people’s needs</h2>
                </div>

                <div className="row">
                    <div className="col col-left">
                        <div className="faq-accordion">
                            <Accordion allowZeroExpanded preExpanded={["a"]}>
                                {[
                                    {
                                        id: "a", question: "Innovation", answer: 'We are committed to empowering our clients with innovative technology solutions for emissions reduction and energy transition to achieve environmental goals.'
                                    },
                                    { id: "b", question: "Collaboration", answer: 'We foster strong partnerships with clients, industry experts, non-profits,and regulatory authorities to tackle environmental and economic challenges.' },
                                    { id: "c", question: "Integrity", answer: 'Our approach combines integrity and transparency, driving solutions that align with clients’ environmental goals for a sustainable future.' },
                                    { id: "d", question: "Environmental Accountability", answer: 'We focus on setting clear goals, with accurate measurement metrics to track progress, and maintain transparency, reinforcing a culture of accountability.' },
                                    { id: "e", question: "Entrepreneurial Spirit", answer: 'We are committed to empowering our clients with innovative technology solutions for emissions reduction and energy transition to achieve environmental goals.' },
                                ].map(({ id, question, answer }) => (
                                    <AccordionItem key={id} uuid={id}>
                                        <AccordionItemHeading>
                                            <AccordionItemButton>{question}</AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            <p>
                                                {answer}
                                            </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>

                    <div className="col col-right">
                        <div className="faq-img" data-aos="zoom-in" data-aos-duration="1000">
                            <img src={faqImg} alt="FAQ" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;
