import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./HomeMenuItem.scss";

interface SubmenuItem {
    label: string;
    link: string;
}

interface MenuItemProps {
    label: string;
    link: string;
    submenu?: SubmenuItem[];
}

const MenuItem: React.FC<MenuItemProps> = ({ label, link, submenu }) => {
    const location = useLocation();
    const isActive = location.pathname === link;

    if (submenu) {
        return (
            <li className="menu-item has-submenu">
                <span className="menu-link">
                    {label} <span className="submenu-indicator">▼</span>
                </span>
                <ul className="submenu">
                    {submenu.map((subItem) => (
                        <li key={subItem.label}>
                            <Link
                                to={subItem.link}
                                className={`submenu-link ${location.pathname === subItem.link ? "active" : ""
                                    }`}
                            >
                                {subItem.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </li>
        );
    }

    return (
        <li className="menu-item">
            <Link to={link} className={`menu-link ${isActive ? "active" : ""}`}>
                {label}
            </Link>
        </li>
    );
};

export default MenuItem;
