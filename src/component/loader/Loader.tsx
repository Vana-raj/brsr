import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import "./Loader.scss";

interface LoadingProps {
    size?: number;
}

const Loader: React.FC<LoadingProps> = ({ size = 48 }) => {
    return (
        <div className="loading-container">
            <LoadingOutlined style={{ fontSize: size }} spin />
        </div>
    );
};

export default Loader;
