import React, { useEffect } from "react";
import { Avatar, Card, Modal, Tabs } from "antd";
import {
    SettingOutlined,
    HistoryOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { ReactComponent as Profile } from '../../assets/images/profile.svg'
import CustomButton from "../../component/buttons/CustomButton";
import { userInfo } from "../../utils/Options";
import { useNavigate } from "react-router-dom";
import "./Profile.scss";

const { TabPane } = Tabs;

const ProfilePage: React.FC = () => {
    const navigate = useNavigate()

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

const handleAccountsChanged = (accounts:string[]) => {
  if (accounts.length === 0) {
    console.log('Wallet disconnected');
    localStorage.removeItem('walletAddress');
  } else {
    const newAddress = accounts[0];
    localStorage.setItem('walletAddress', newAddress);
  }
};

const handleChainChanged = (chainId:string) => {
  console.log('Chain changed:', chainId);
  window.location.reload();
};

const setupWalletListeners = () => {
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
  }
};
 const removeWalletListeners = () => {
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    }
  };

 useEffect(() => {
        setupWalletListeners();
        return () => {
            removeWalletListeners();
        };
    }, []);

const disconnectWallet = async () => {
  try {
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletProvider');
    
    if (window.ethereum) {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
      
      try {
        await window.ethereum.request({
          method: 'wallet_revokePermissions',
          params: [{ eth_accounts: {} }]
        });
      } catch (error) {
        console.log('Revoke permissions not supported', error);
      }
    }
    
    if (window.ethereum?.disconnect) {
      await window.ethereum.disconnect();
    }
  } catch (error) {
    console.error('Error disconnecting wallet:', error);
  }
};

const handleLogout = async () => {
  try {
    const channel = new BroadcastChannel("wallet-sync");
    channel.postMessage("logout");
    channel.close();

    await disconnectWallet();
    localStorage.clear();

    window.location.href = `http://localhost:3001/login`;
  } catch (error) {
    console.error("Logout error:", error);
  }
};


    return (
        <div className="profile-main">
            <div className="profile-page">
                <Card className="profile-card">
                    <div className="profile-header">
                        <Avatar size={100} icon={<Profile />} />
                        <div className="profile-info">
                            <h2>{userInfo.name}</h2>
                            <p className="profile-email">{userInfo.email}</p>
                            <p className="profile-phone">{userInfo.phone}</p>
                            <p className="profile-bio">{userInfo.user}</p>
                        </div>
                    </div>
                    <CustomButton
                        type="primary"
                        icon={<LogoutOutlined />}
                        onClick={showLogoutConfirm}
                        className="logout-button"
                        label="Logout"
                    />

                </Card>
                <Card className="profile-tabs">
                    <Tabs defaultActiveKey="1" className="custom-tabs">
                        <TabPane
                            tab={
                                <><span>
                                    <SettingOutlined />

                                </span>
                                    <div>
                                        Account Settings
                                    </div></>
                            }
                            key="1"
                        >
                            <div className="tab-content">
                                <h3>Update your settings</h3>
                                <p>Here you can manage your account preferences and security.</p>
                            </div>
                        </TabPane>
                        <TabPane
                            tab={
                                <>
                                    <span>
                                        <HistoryOutlined />

                                    </span>
                                    <div>
                                        History
                                    </div>
                                </>
                            }
                            key="2"
                        >
                            <div className="tab-content">
                                <h3>Your List</h3>
                                <p>No History found.</p>
                            </div>
                        </TabPane>
                    </Tabs>
                </Card>
            </div>
        </div>
    );
};

export default ProfilePage;
