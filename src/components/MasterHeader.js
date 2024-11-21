import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import '../styles/MasterHeader.css'
import { Transition } from 'react-transition-group';
import { Link } from "react-router-dom";
import axios from 'axios';

function MasterHeader() {

    async function onClick() {
        await handleLogout();
    }

    async function handleLogout() {
        await axios.post('/api/logout', 
        // await axios.post('/api/logout', 
            
            { "Content-Type": "application/json", withCredentials: true }   //withCredentials: true: 브라우저에서 세션 쿠키(JSESSIONID)를 함께 전송
        )    
        .then(response => {
            // 302 상태 코드가 반환되면 자동으로 리다이렉트 URL을 사용하여 페이지 이동
            const redirectUrl = response.headers['Location'];  // 응답 헤더에서 Location 추출
            console.log(redirectUrl);
            window.location.href = redirectUrl;  // 해당 URL로 리다이렉트
        })
        //   .then(() => {
        //     console.log("로그아웃 완료");
        //     // window.location.href = '/login'; // 로그아웃 후 리다이렉트
        //   })
          .catch(error => {
            console.error('Logout failed', error);
          });
    }

    const onClickIntroduceButton = () => {
        console.log("글잇다 소개 버튼 클릭");
    }


    return (
        <div className="mh-container">
            <h1 button className="mh-title-button">글잇다</h1>
            <button className="mh-introduce-button" onClick={onClickIntroduceButton}>글잇다 소개</button>
            <Link to="/login"  style={{ textDecoration: "none", color: "black"}}>
                <button>로그인</button>
            </Link>
                <button onClick={onClick}>로그아웃</button>
        </div>
    );
}

export default MasterHeader;
