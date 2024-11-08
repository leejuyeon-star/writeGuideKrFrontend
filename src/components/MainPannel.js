import PropTypes from "prop-types";
import { useEffect, useState, useRef,useContext } from "react";
import { useParams } from "react-router-dom";
import '../styles/MainPannel.css';
import { Transition } from 'react-transition-group';
// import MainNote from "./MainNote";
import MainNote from "./mainPannelFolder/MainNote";
import MainFooter from "./mainPannelFolder/MainFooter";
import MasterHeader from "./mainPannelFolder/MasterHeader";
import { IsRightPannelVisibleContext, AnswerStateContext } from '../ContextProvider';



function MainPannel({ onRequestedHelp, changedContentInfo}) {
    const { state: {isRightPannelVisible}, actions:{setIsRightPannelVisible} } = useContext(IsRightPannelVisibleContext);
    const { state: {answerState} } = useContext(AnswerStateContext);

    //자식에게 받은 값 부모에게 전달하기 (ai 요청, 패널 열라고 하기)
    const handleRequestedHelp = (...param) => {
        //현재 패널 열려있으면 고정, 아니면 이동
        onRequestedHelp(param[0]);
        if (!isRightPannelVisible){
            setIsRightPannelVisible(true);
            // setIsRightPannelVisible(true);
        }
        // setIsDraggedButtonOn(false);
    };
 
    const defaultStyle = {
        transition: `width 700ms ease-out`,
    };

    const transitionStyles = {
        entering: { width: `70vw` },
        entered: { width: `70vw` },
        exiting: { width: `100vw` },
        exited: { width: `100vw` },  
    };

    return (
        <>
            <Transition in={isRightPannelVisible} timeout={700}>
                {(state) => (
                    <div
                        style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                        }}
                    >
                        {/* <header className="mp-header"> */}
                            <MasterHeader />
                        {/* </header> */}
                        <div className="mp-container">
                            <div className="mp-sub-container">
                                <MainNote onRequestedHelp={handleRequestedHelp} changedContentInfo={changedContentInfo}/>
                            </div>
                        </div>
                        <div className="mp-advertise-container">
                            광고    
                        </div>
                        {/* <div className="mp-footer"> */}
                            <MainFooter />
                        {/* </div> */}

                    </div>
                )}
            </Transition>
        </>
    );
    



    
}


export default MainPannel;

