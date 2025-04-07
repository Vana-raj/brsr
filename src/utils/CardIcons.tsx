import { ReactComponent as Supplier } from '../assets/icons/SupplierIcon.svg';
import { ReactComponent as ThumbsUp } from '../assets/icons/ThumbsUpIcon.svg';
import { ReactComponent as ThumbsDown } from '../assets/icons/ThumbsDownIcon.svg';
import { ReactComponent as Warning } from '../assets/icons/WarningIcon.svg';
import { ReactComponent as Delivery } from '../assets/icons/DeliveryIcon.svg';
import { ReactComponent as Audits } from '../assets/icons/AuditIcon.svg';
import { ReactComponent as Certificate } from '../assets/icons/CertificateIcon.svg';
import { ReactComponent as CertificateFill } from '../assets/icons/CertificateFilledIcon.svg';
import { ReactComponent as Revenue } from '../assets/icons/RevenueIcon.svg';
import { ReactComponent as AuditPass } from '../assets/icons/AuditPassIcon.svg';
import { ReactComponent as Score } from '../assets/icons/ScoreIcon.svg';
import { ReactComponent as Rating } from '../assets/icons/RatingIcon.svg';
import { ReactComponent as History } from '../assets/icons/HistoryIcon.svg';
import { ReactComponent as Background } from '../assets/images/login_background.svg';

import '../style/mixins/mixins.scss'



export const SuppliersIcon: React.FC = () => {
    return (
        <div className='hover-img'>
            <Supplier />
        </div>
    )
};

export const ThumbsDownIcon: React.FC = () => {
    return (
        <div className='hover-img'>
            <ThumbsDown />
        </div>

    )
};


export const ThumbsUpIcon: React.FC = () => {
    return (
        <div className='hover-img'>
            <ThumbsUp />
        </div>

    )
};

export const WarningIcon: React.FC = () => {
    return (
        <div className='hover-img' >
            <Warning />
        </div>

    )
};

export const AuditsIcon: React.FC = () => {
    return (
        <div className='hover-img'>
            <Audits />
        </div>

    )
};

export const DeliveryIcon: React.FC = () => {
    return (
        <div className='hover-img' >
            <Delivery />
        </div>

    )
}

export const CertificateIcon: React.FC = () => {
    return (
        <div className="hover-img">
            <Certificate />
        </div>
    );
};

export const CertificateFillIcon: React.FC = () => {
    return (
        <div className="hover-img">
            <CertificateFill />
        </div>

    )

}

export const RevenueIcon: React.FC = () => {
    return (
        <div className="hover-img">
            <Revenue />
        </div>

    )

}
export const RatingIcon: React.FC = () => {
    return (
        <div className="hover-img">
            <Rating />
        </div>
    )

}

export const ScoreIcon: React.FC = () => {
    return (
        <div className="hover-img">
            <Score />
        </div>
    )

}
export const HistoryIcon: React.FC = () => {
    return (
        <div className="hover-img">
            <History />
        </div>
    )

}

export const AuditPassIcon: React.FC = () => {
    return (
        <div className="hover-img">
            <AuditPass />
        </div>
    )
}


export const BackgroundImg: React.FC = () => {
    return (
        <div className="hover-img">
            <Background />
        </div>
    )
}