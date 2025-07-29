import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuItem from "../homemenuitem/HomeMenuItem";
import { ethers } from "ethers";
import { menus } from "../../libs/menus";
import logo from "../../assets/images/Aeiforo-logo.png";
import { Button } from "antd";
import "./HomeNavbar.scss";

const HomeNavbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const navigate = useNavigate();

    const toggleNavbar = () => {
        setMenuOpen(!menuOpen);
    };

    const connectWallet = async () => {
        if (typeof window.ethereum !== "undefined") {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.send("eth_requestAccounts", []);
                const address = accounts;
                setWalletAddress(accounts[0]);
                localStorage.setItem("walletAddress", address);
                navigate("/dashboard");
            } catch (err) {
                console.error("User rejected the connection", err);
            }
        } else {
            alert("MetaMask not detected. Please install MetaMask.");
        }
    };

    useEffect(() => {
        const navbar = document.getElementById("navbar");
        const handleScroll = () => {
            if (window.scrollY > 170) {
                navbar?.classList.add("is-sticky");
            } else {
                navbar?.classList.remove("is-sticky");
            }
        };
        document.addEventListener("scroll", handleScroll);
        return () => document.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header id="navbar" className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <img src={logo} alt="logo" width={180} height={60} />
                </Link>

                <button
                    className={`navbar-toggle ${menuOpen ? "open" : ""}`}
                    onClick={toggleNavbar}
                >
                    <span className="bar" />
                    <span className="bar" />
                    <span className="bar" />
                </button>

                <nav className={`navbar-menu ${menuOpen ? "show" : ""}`}>
                    <ul className="navbar-nav">
                        {menus.map((menuItem) => (
                            <MenuItem key={menuItem.label} {...menuItem} />
                        ))}
                    </ul>
                    <div className="navbar-actions">
                        {walletAddress ? (
                            <span className="wallet-address">
                                {walletAddress.slice(0, 6)}...
                                {walletAddress.slice(-4)}
                            </span>
                        ) : (
                            <Button onClick={connectWallet} className="btn-connect">
                                Connect Wallet
                            </Button>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default HomeNavbar;
