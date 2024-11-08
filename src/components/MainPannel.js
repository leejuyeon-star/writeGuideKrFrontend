import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import '../styles/MainPannel.css';
import { Transition } from 'react-transition-group';
// import MainNote from "./MainNote";
import MainNote from "./mainPannelFolder/MainNote";
import MasterHeader from "./mainPannelFolder/MasterHeader";


function MainPannel({ onRightPannelVisible, onRequestedHelp, changedContentInfo}) {
    // const [content, setContent] = useState("");
    // const [isReady, setIsReady] = useState(false);
    // const [changedContent, setChangedContent] = useState("");
    const [isRightPannelVisible, setIsRightPannelVisible] = useState(false);
    // const [isDraggedButtonOn, setIsDraggedButtonOn] = useState(false);
    // const contentRef = useRef(null);

    //자식에게 받은 값 부모에게 전달하기 (ai 요청, 패널 열라고 하기)
    const handleRequestedHelp = (...param) => {
        //현재 패널 열려있으면 고정, 아니면 이동
        onRequestedHelp(param[0]);
        if (!isRightPannelVisible){
            onRightPannelVisible(true);
            setIsRightPannelVisible(true);
        }
        // setIsDraggedButtonOn(false);
    };
 
    const defaultStyle = {
        transition: `width 700ms ease-out`,
    };

    const transitionStyles = {
        entering: { width: `100vw` },
        entered: { width: `70vw` },
        exiting: { width: `70vw` },
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
                    </div>
                )}
            </Transition>
        </>
    );
    



    
}


export default MainPannel;

