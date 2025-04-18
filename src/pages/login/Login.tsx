import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Input, Checkbox, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import AeiforoLogo from '../../assets/images/Aeiforo-logo.png';
import CustomButton from '../../component/buttons/CustomButton';
// import { loginApi } from '../../features/action/SupplierAction';
import './Login.scss';

const LoginPage = () => {
    const navigate = useNavigate();
    const Background = require('../../assets/images/login_background.svg').default;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    useEffect(() => {

        const savedEmail = localStorage.getItem('rememberedEmail');
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }, []);


    // const [username, setUsername] = useState('');

    const correctUsername = 'admin@demo.com';
    const correctPassword = 'admin@123';

    const handleLogin = () => {
        if (!email || !password) {
            message.error('Please fill in both username and password!');
            return;
        }
        if (email === correctUsername && password === correctPassword) {
            navigate('/dashboard');
        } else {
            message.error('Invalid username or password!');
        }
    };

    // const handleLogin = async () => {
    //     if (!email || !password) {
    //         message.error("Please fill in both email and password!");
    //         return;
    //     }

    //     try {
    //         const response = await loginApi({ email, password }, setLoading);
    //         message.success("Login successful!");
    //         localStorage.setItem("accessToken", response.access_token);
    //         localStorage.setItem("refreshToken", response.refresh_token);
    //         localStorage.setItem("user", JSON.stringify(response));

    //         if (rememberMe) {
    //             localStorage.setItem('rememberedEmail', email);
    //         } else {
    //             localStorage.removeItem('rememberedEmail');
    //         }

    //         navigate("/dashboard");
    //     } catch (error: any) {
    //         if (error.response) {
    //             if (error.response.status === 401) {
    //                 message.error("Invalid email or password!");
    //             } else {
    //                 message.error("Something went wrong. Please try again!");
    //             }
    //         } else if (error.request) {
    //             message.error("Network error. Please check your connection.");
    //         } else {
    //             message.error("An unexpected error occurred.");
    //         }
    //     }
    // };

    return (
        <div className="login-page">
            <div className="login-illustration">
                <div className="login-con">
                    <img width={120} src={AeiforoLogo} alt="Aeiforo Logo" />
                </div>
                <div className="illustration-content">
                    <img src={Background} alt="Illustration" />
                </div>
            </div>
            <div className="login-form-logo">
                <img width={120} src={AeiforoLogo} alt="Aeiforo Logo" />
            </div>
            <div className="login-form-container">
                <Card className="login-card">
                    <div className="login-header">
                        <h2>Welcome to Aeiforo</h2>
                    </div>
                    <form className="login-form" onSubmit={(e) => e.preventDefault()}>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Email"
                            className="login-input"
                            value={email}
                            name='email'
                            aria-label="Email input"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            className="login-input"
                            value={password}
                            aria-label="Password input"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="login-options">
                            <Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}>Remember me</Checkbox>
                            <a href="/forgot-password" className="forgot-password-link">
                                Forgot password?
                            </a>
                        </div>
                        <CustomButton
                            type="primary"
                            className="login-button"
                            onClick={handleLogin}
                            disabled={loading}
                            label={loading ? " Loading..." : 'Log In'}
                        />

                    </form>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;
