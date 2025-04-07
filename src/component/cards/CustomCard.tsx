import React, { ReactNode } from 'react';
import { Card } from 'antd';
import './Card.scss';

interface CustomCardProps {
  title: string;
  content: ReactNode;
  icon?: React.ReactNode;
  footerContent?: React.ReactNode;
  onClick?: () => void;
  isLow?: number
}

const CustomCard: React.FC<CustomCardProps> = ({
  title,
  content,
  icon,
  footerContent,
  onClick,
  isLow,
}) => {
  const cardStyles = {
    backgroundColor: (isLow || 0) < 50 ? '#DAF5E9' : '#E6F7FF', border: (isLow || 0) < 50 ? 'solid 1px #09B96D33' : 'solid 1px #91D5FF'
  };

  return (
    <div className="custom-card">
      <Card
        bordered={false}
        onClick={onClick}
        style={cardStyles}
      >
        <div className="card-content">
          <div className="icon">{icon}</div>
          <div>
            <h3 className="card-title">{title}</h3>
            <p className="card-value">{content}</p>
          </div>
        </div>
        {footerContent && <div className="ant-card-footer">{footerContent}</div>}
      </Card>
    </div>
  );
};

export default CustomCard;
