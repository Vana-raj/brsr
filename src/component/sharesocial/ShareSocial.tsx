import React, { useState } from 'react';
import { FaCopy, FaCheck } from "react-icons/fa";
import {
    EmailShareButton,
    EmailIcon,
} from 'react-share';
import { Tooltip } from 'antd';
import { ReactComponent as ShareIcon } from '../../assets/icons/ShareIcon.svg';
import { bgColor } from '../../style/ColorCode';
import './ShareSocial.scss';

export const ShareComponent: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const url = "http://192.168.2.72:3000/";
    const title = "Check out this amazing content!";
    const link = "http://192.168.2.72:3000/";
    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const handleCopy = async () => {
        if (!link) {
            console.error("Link is empty, nothing to copy.");
            return;
        }
        if (navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(link);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
                return;
            } catch (err) {
                console.error("Failed to copy using Clipboard API: ", err);
            }
        }
        try {
            const textarea = document.createElement("textarea");
            textarea.value = link;
            textarea.style.position = "absolute";
            textarea.style.opacity = "0";
            document.body.appendChild(textarea);
            textarea.select();
            const successful = document.execCommand("copy");
            document.body.removeChild(textarea);
            if (successful) {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } else {
                console.error("Fallback copy method failed.");
            }
        } catch (fallbackErr) {
            console.error("Fallback copy method encountered an error: ", fallbackErr);
        }
    };


    return (
        <div>
            <Tooltip
                color={bgColor}
                title={
                    <div className="modal-overlay" onClick={toggleModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className='modal-header'>
                                <div className='share'>Share</div>
                                <button
                                    className="copy-link"
                                    onClick={handleCopy}
                                    aria-label="Copy link"
                                >
                                    {copied ? (
                                        <>
                                            <FaCheck className="icon" /> Copied
                                        </>
                                    ) : (
                                        <>
                                            <FaCopy className="icon" /> Copy Link
                                        </>
                                    )}
                                </button>
                            </div>
                            <div className="share-options">
                                <div className='share-flex'>
                                    <div className='share-email'>
                                        <EmailShareButton url={url} title={title}>
                                            <EmailIcon size={32} round />
                                            <div>Email</div>
                                        </EmailShareButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                placement="bottom"
                className="custom-tooltip"
            >
                <button className="shareIcon" onClick={toggleModal} aria-label="Share">
                    <ShareIcon />
                    <div>Share</div>
                </button>
            </Tooltip>
        </div>
    );
};
