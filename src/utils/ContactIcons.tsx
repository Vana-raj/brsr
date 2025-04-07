import { ReactComponent as HomeIcon } from '../assets/icons/HomeIcon.svg';
import { ReactComponent as GlobalIcon } from '../assets/icons/GlobalIcon.svg';
import { ReactComponent as ShareIcon } from '../assets/icons/ShareIcon.svg';
import { ReactComponent as MailIcon } from '../assets/icons/MailIcon.svg';
import '../style/mixins/mixins.scss'
  
export const HomeIconComponent: React.FC = () => {
    return <HomeIcon />;
};

export const GlobalIconComponent: React.FC = () => {
    return <GlobalIcon />;
};
export const ShareComponent: React.FC = () => {
  
  
    return (
      <div className="shareIcon">
        <div>
          <ShareIcon />
        </div>
      </div>
    );
  };

export const MailIconComponent: React.FC = () => {
    return <MailIcon />;
};
