import React, { useEffect, useState, useCallback } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Avatar, Modal, Tooltip } from 'antd';
import { matchSorter } from 'match-sorter';
import AeiforoLogo from '../../assets/images/Aeiforo-logo.png';
import { ReactComponent as Profile } from '../../assets/images/profile.svg';
import CustomSearchInput from '../inputfield/CustomSearchInput';
import { BellOutlined, LogoutOutlined, SettingFilled } from '@ant-design/icons';
import CustomModal from '../popup/CustomModel';
import { userInfo } from '../../utils/Options';
import { bgColor } from '../../style/ColorCode';
import './NavBar.scss';
// import { useWeb3Modal } from '@web3modal/react';

interface SearchRoute {
    keys: string[];
    path: string;
    children?: SearchRoute[];
}

const NavBar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeLink, setActiveLink] = useState<string>('Dashboard');
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { id: supplierId } = useParams<{ id?: string }>();
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [processedRoutes, setProcessedRoutes] = useState<SearchRoute[]>([]);
    const [walletAddress, setWalletAddress] = useState<string | null>(null);

    const searchConfig: SearchRoute[] = [
        { keys: ['dashboard', 'home'], path: '/dashboard' },
        { keys: ['reports', 'document'], path: '/reports' },
        // { keys: ['quality', 'standard'], path: '/quality' },
        { keys: ['analytics', 'stats'], path: '/analytics' },
        { keys: ['profile', 'account'], path: '/profile' },
        { keys: ['supplier', 'vendor'], path: '/supplier-management' },
        { keys: ['questionnaire', 'survey'], path: '/questionnaire' },
        { keys: ['user', 'management', 'settings', 'role'], path: '/user-creation' },
        { keys: ['company', 'organization'], path: '/company' },
        {
            keys: ['supplier details', 'supplier'],
            path: '/supplier/:id',
            children: [
                { keys: ['overview', 'overall report'], path: 'overview' },
                { keys: ['company governance'], path: 'company' },
                { keys: ['products services'], path: 'products&services' },
                { keys: ['location'], path: 'location' },
                { keys: ['governance'], path: 'governance' },
                { keys: ['carbon', 'emissions'], path: 'carbon' },
                { keys: ['performance'], path: 'performance' },
                { keys: ['analyse'], path: 'analyse' },
                { keys: ['waste consumption'], path: 'waste-consumption' },
                { keys: ['supplier reports'], path: 'reports' },
                { keys: ['benchmark sustainability'], path: 'benchmark-sustainability' },
                { keys: ['strategy roadmap'], path: 'strategy-road-map' },
            ],
        },
    ];

    const processRoutes = useCallback((): SearchRoute[] => {
        return searchConfig.flatMap((route) => {
            if (route.path.includes(':id')) {
                if (!supplierId) return [];

                const basePath = route.path.replace(':id', supplierId);

                const processed: SearchRoute[] = [
                    {
                        ...route,
                        path: basePath,
                        keys: [...route.keys, `supplier ${supplierId}`],
                    },
                ];

                if (route.children) {
                    processed.push(
                        ...route.children.map((child) => ({
                            keys: child.keys,
                            path: `${basePath}/${child.path}`,
                            children: undefined,
                        }))
                    );
                }

                return processed;
            }
            return [route];
        });
    }, [supplierId]);

    useEffect(() => {
        const newRoutes = processRoutes();
        setProcessedRoutes(newRoutes);

        if (searchQuery.trim()) {
            const results = matchSorter(newRoutes, searchQuery, { keys: ['keys'] });
            setSuggestions(results.map((r) => r.keys.join(' › ')));
        }
    }, [processRoutes, searchQuery]);

    const handleSearch = useCallback(() => {
        const cleanedQuery = searchQuery.trim().toLowerCase();
        if (!cleanedQuery) return;

        const results = matchSorter(processedRoutes, cleanedQuery, {
            keys: ['keys'],
            threshold: matchSorter.rankings.CONTAINS,
        });

        if (results.length > 0) {
            navigate(results[0].path);
            setSearchQuery('');
        }
    }, [searchQuery, processedRoutes, navigate]);

    useEffect(() => {
        const savedAddress = localStorage.getItem("walletAddress");
        if (savedAddress) {
            setWalletAddress(savedAddress);
        }
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchQuery.trim()) handleSearch();
        }, 1000);

        return () => clearTimeout(timeout);
    }, [searchQuery, handleSearch]);

    const showLogoutConfirm = () => {
        Modal.confirm({
            title: 'Are you sure you want to logout?',
            content: 'You will be logged out and returned to the login page.',
            okText: 'Logout',
            cancelText: 'Cancel',
            onOk: handleLogout,
            onCancel: () => { },
        });
    };

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        const path = location.pathname.split('/')[1];
        setActiveLink(path || 'dashboard');
    }, [location.pathname]);

    const handleLinkClick = (linkName: string) => {
        setActiveLink(linkName);
    };
    const disconnectWallet = () => {
        if (window.ethereum && window.ethereum.disconnect) {
            window.ethereum.disconnect();
        }
        if (window.ethereum && window.ethereum.provider && window.ethereum.provider.disconnect) {
            window.ethereum.provider.disconnect();
        }
        localStorage.removeItem('walletConnected');
        localStorage.removeItem('walletAddress');
        localStorage.removeItem('walletProvider');
    };

    const handleLogout = () => {
        disconnectWallet();
        setIsDropdownOpen(!isDropdownOpen);
        navigate('/');
        localStorage.removeItem('record');
        localStorage.removeItem('activeTab');
        localStorage.removeItem('totalAnswered');
        localStorage.removeItem('answeredQuestions');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    };


    const goToProfile = () => {
        navigate('/profile');
    };

    const goToQuestionnaire = () => {
        navigate('/questionnaire');
    };

    const goToUserManagement = () => {
        navigate('/user-creation');
    };

    const goToCompanyForm = () => {
        navigate('/company');
    };

    const goToHomePage = () => {
        navigate('/dashboard');
    };

    const goToSupplierManagement = () => {
        navigate('/supplier-management');
    };

    const setting = (
        <div className="dropdown-menu">
            <div className="profile-content">
                <div className="supplier-name" onClick={goToSupplierManagement}>
                    Supplier
                </div>
                <div className="supplier-name" onClick={goToQuestionnaire}>
                    Questionnaire
                </div>
                <div className="supplier-name" onClick={goToCompanyForm}>
                    Company Form
                </div>
                <div className="user-name" onClick={goToUserManagement}>
                    User Management
                </div>
            </div>
        </div>
    );

    const profile = (
        <div className="dropdown-menu">
            <div className="dropdown-item">
                <Avatar size={45} icon={<Profile />} onClick={handleOpenModal} />
                <div className="profile-details">
                    <span className="profile-name">{walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : ""}</span>
                    <span className="profile-role">{userInfo?.user}</span>
                </div>
            </div>
            <div className="profile-content">
                <div className="profile" role="button" onClick={goToProfile}>
                    Profile
                </div>
            </div>
            <div className="dropdown-item logout" onClick={showLogoutConfirm}>
                <LogoutOutlined />
                <span>Logout</span>
            </div>
        </div>
    );

    return (
        <>
            <div className="navbar">
                <div className="navbar-logo">
                    <img
                        width={180}
                        src={AeiforoLogo}
                        onClick={goToHomePage}
                        alt="AeiforoLogo"
                    />
                </div>
                <div className="flex">
                    <ul>
                        <li>
                            <Link
                                to="/dashboard"
                                className={activeLink === 'dashboard' ? 'active' : ''}
                                onClick={() => handleLinkClick('dashboard')}
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/reports"
                                className={activeLink === 'reports' ? 'active' : ''}
                                onClick={() => handleLinkClick('reports')}
                            >
                                BRSR
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/analytics"
                                className={activeLink === 'analytics' ? 'active' : ''}
                                onClick={() => handleLinkClick('analytics')}
                            >
                                Analytics
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="nav-profile-all">
                    <CustomSearchInput
                        value={searchQuery}
                        onChange={setSearchQuery}
                        onPressEnter={handleSearch}
                        suggestions={suggestions}
                        onSuggestionSelect={(index: number) => {
                            navigate(processedRoutes[index].path);
                            setSearchQuery('');
                        }}
                        placeholder="Search here..."
                    />
                    <div className="nav-profile">
                        <BellOutlined />
                        <div className="settings-icon">
                            <Tooltip color={bgColor} title={setting}>
                                <SettingFilled />
                            </Tooltip>
                        </div>
                    </div>
                    <div className="profile-details">
                        <span className="profile-name-out">{userInfo?.user}</span>
                        <span className="profile-role-out">{walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : ""}</span>
                    </div>
                    <div className="nav-profile-pic">
                        <Tooltip trigger={'click'} color={bgColor} placement="rightTop" title={profile}>
                            <Avatar size={40} icon={<Profile />} />
                        </Tooltip>
                    </div>
                </div>
            </div>
            <CustomModal
                visible={isModalVisible}
                onClose={handleCloseModal}
                title={''}
                content={<Profile />}
                closable={false}
                footer={null}
            />
        </>
    );
};

export default NavBar;