import { useState, useEffect, delay, useContext } from "react";
import axios from 'axios';


function Login() {
    const domain = "http://localhost:8080";
    const naverLoginLink = `${domain}/oauth2/authorization/naver`;

    return(
        <div>
            <a href={naverLoginLink}>구글 로그인</a>
        </div>
    );
}

export default Login;