import { useState, useEffect, delay, useContext } from "react";
import axios from 'axios';
import '../styles/Login.css'
import MasterHeader from "../components/MasterHeader";
import { Link } from "react-router-dom";


function Login() {
    const domain = "http://localhost:8080";
    const naverLoginLink = `${domain}/oauth2/authorization/naver`;
    const googleLoginLink = `${domain}/oauth2/authorization/google`;
    // const googleLoginImg = process.env.PUBLIC_URL + "/images/copy.png";
    const naverLogoImg = process.env.PUBLIC_URL + "/images/naver_logo.png";
    const googleLogoImg = process.env.PUBLIC_URL + "/images/google_logo.png";

    return(
        <div>
            <div className="login-main-container">
            <section className="login-content-wrapper">
                <section className="login-title-wrapper">
                    <div className="login-title-logo"></div>
                    <h1 className="login-title">로그인</h1>
                </section>
                <div className="login-devider"></div>
                <div className="login-login-container">
                    <div className="login-social-section">
                        <Link to={naverLoginLink}  style={{ textDecoration: "none", color: "black"}}>
                            <div className="login-social-btn login-naver-btn" >
                                <span className="login-social-logo-wrapper">
                                    <img src={naverLogoImg} className="login-naver-logo"/>
                                </span>
                                <span className="social-text">네이버 계정으로 로그인</span>
                            </div>
                        </Link>
                        <Link to={googleLoginLink}  style={{ textDecoration: "none", color: "black"}}>
                            <div className="login-social-btn">
                                    <span className="login-social-logo-wrapper">
                                        <img src={googleLogoImg} className="login-google-logo"/>
                                    </span>
                                <span className="social-text">Google 계정으로 로그인</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
            </div>
            </div>

    );
}


export default Login;

