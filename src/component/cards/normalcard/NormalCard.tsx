import React from 'react';
import './NormalCard.scss';

interface NormalCardProps {
    content: any
}
const NormalCard: React.FC<NormalCardProps> = ({ content }) => {
    return (
        <div className='normal-card-main'>
            {content}
        </div>
    )
}

export default NormalCard
