import PropTypes from "prop-types";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import '../../styles/rightPannelFolder/AiAnswer.css'
import { IsRightPannelVisibleContext, AnswerStateContext } from '../../ContextProvider';


function AiAnswer({ onRequestedHelp, response, onChangeContent }) {
    const { state: {answerState}, actions:{setAnswerState} } = useContext(AnswerStateContext);
    const [responseTxt, setResponseTxt] = useState("");
    const [isClickedResponseTextButton, setIsClickedResponseTextButton] = useState([false, 0]);

    useEffect(() => {
        // 기본 텍스트를 설정합니다.
        if (answerState === "LOADING"){
            setIsClickedResponseTextButton([false, 0]);
        }
    }, [answerState]);

    const handleResponseTextButtonMouseOver = (event) => {
        if (isClickedResponseTextButton[0]) {return;}
        //색 바뀌고
        //내용 바뀌고
        //1번째 내용 바꿔라! 신호 보내기
        console.log(event.target.id);
        const txt = event.target.innerText;
        onChangeContent(false, txt);
    }

    const handleResponseTextButtonMouseOut = () => {
        if (isClickedResponseTextButton[0]) {return;}
        //색 원래대로
        //내용 원래대로
        onChangeContent(false, "");
    }
    
    const handleResponseTextButtonClick = (event) => {
        const buttonId = event.target.id;
        setIsClickedResponseTextButton([true, buttonId]);
        const txt = event.target.innerText;
        setResponseTxt(txt);
        onChangeContent(false, txt);
    }

    const handleClickRetry = () => {
        onRequestedHelp(["retry", "", [0,0]]);
    }

    const handleClickConfirm = () => {
        onChangeContent(true, responseTxt);
        setAnswerState("IDLE");
    }



    return (
        <>
            {answerState === "IDLE" ? 
                <div>대기중입니다.</div> 
                :
                ((answerState === "LOADING") || (answerState === "RELOADING")  ? 
                    <div className="rp-textarea-section">
                        <textarea className="rp-textarea" type="text" placeholder='로딩중..' />
                        <textarea className="rp-textarea" type="text" placeholder='로딩중..' />
                        <textarea className="rp-textarea" type="text" placeholder='로딩중..' />
                    </div>
                    :
                    (answerState === "RECEIVED" ?
                        <div className="rp-textarea-section">
                            <button 
                                id="1"
                                className="rp-response-text-button" 
                                onMouseOver={handleResponseTextButtonMouseOver}
                                onMouseOut={handleResponseTextButtonMouseOut}
                                onClick={handleResponseTextButtonClick}
                            >
                                {response[0]}
                            </button>
                            <button 
                                id="2"
                                className="rp-response-text-button" 
                                onMouseOver={handleResponseTextButtonMouseOver}
                                onMouseOut={handleResponseTextButtonMouseOut}
                                onClick={handleResponseTextButtonClick}
                            >
                                {response[1]}
                            </button>
                            <button 
                                id="3"
                                className="rp-response-text-button" 
                                onMouseOver={handleResponseTextButtonMouseOver}
                                onMouseOut={handleResponseTextButtonMouseOut}
                                onClick={handleResponseTextButtonClick}
                            >
                                {response[2]}
                            </button>
                            <button onClick={handleClickRetry}>재실행</button>
                            {isClickedResponseTextButton[0]  ?
                                <button onClick={handleClickConfirm}>결정</button>
                                : null
                            }
                        </div>
                    : 
                    (answerState === "ERROR" ?
                        <div>ai 답변 에러남</div>
                        : null
                        ) 
                    )
                )}
            

        </> 

    );
}


export default AiAnswer;