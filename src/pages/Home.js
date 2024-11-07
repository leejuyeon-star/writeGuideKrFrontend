import { useState, useEffect, delay } from "react";
import MainNote from "../components/MainNote";
import RightPannel from "../components/RightPannel";
import { CSSTransition} from 'react-transition-group';
import { CallClaude } from "../api/claude"


function Home() {
    const [helpMsg, setHelpMsg] = useState(["", ""]);
    const [isLoading, setIsLoading] = useState(false);
    const [answers, setAnswers] = useState(["","",""]);
    const [isRightPannelVisible, setIsRightPannelVisible] = useState(false);
    const [changedContentInfo, setChangedContentInfo] = useState(["", false, "", "", [0,0]]);
    const [selectedIdx, setSelectedIdx] = useState([0,0]);
    const [content, setContent] = useState("");
    const [requestMsg, setRequestMsg] = useState("");

    const onRightPannelVisible = async (isOn) => {
        if (isOn && !isRightPannelVisible ) {
            setIsRightPannelVisible(true);
            console.log("!");
        }
    }

    const handleRequestedHelp = async ([_requestMsg, _content, _selectedIdx]) => {
        if (_requestMsg === "") {return;}
        if (_requestMsg === "selectedText") {
            // isReady = false;
            //준비중... 내보내기
            
            setContent(_content);
            setSelectedIdx(_selectedIdx);
            setIsLoading(true);
            setRequestMsg(_requestMsg);
            // isLoading(false);
            // response([answer1, answer2, answer3]);
            //단어/구 ai 검색
            
        } 
        else if (_requestMsg === "retry") {
            if (requestMsg === "selectedText"){     
                console.log("이전 요청건이 'selectedText'인 경우");
                setIsLoading(true);
            }
            //단어/구 재검색
        } 
    }

    const handleChangeContent = async (requestMsg, isApply, txt) => {
        if (requestMsg === "" || content === "") {console.log("출력");return;}
        if (requestMsg === "selectedText") {
            setChangedContentInfo([requestMsg, isApply, txt, content, selectedIdx]);
            // isLoading(false);
            // response([answer1, answer2, answer3]);

        }
    }

    const handleApiCall = async () => {
        // await CallGPT();
        await CallClaude();
    }
    return (
        <div>
            <button onClick={handleApiCall}>gpt call</button>
            <MainNote onRightPannelVisible={onRightPannelVisible} onRequestedHelp={handleRequestedHelp} changedContentInfo={changedContentInfo}/>
            <RightPannel isRightPannelVisible={isRightPannelVisible} onRequestedHelp={handleRequestedHelp} isLoading={isLoading} response={answers} onChangeContent={handleChangeContent}/>
        </div>
    );
}

export default Home;