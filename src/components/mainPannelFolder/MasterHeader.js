import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import '../../styles/mainPannelFolder/MasterHeader.css'
import { Transition } from 'react-transition-group';


function MasterHeader() {

    const onClickIntroduceButton = () => {
        console.log("글잇다 소개 버튼 클릭");
    }

    return (
        <div className="mh-container">
            <h1 button className="mh-title-button">글잇다</h1>
            <button className="mh-introduce-button" onClick={onClickIntroduceButton}>글잇다 소개</button>
            {/* <h2>로그인</h2> */}
        </div>
    );
}

export default MasterHeader;
