import { useState, useEffect, delay, useContext } from "react";

import MainPannel from "../components/MainPannel";
import RightPannel from "../components/RightPannel";
import { CSSTransition} from 'react-transition-group';
import { CallBetweenPhrase } from "../api/claude"
import { IsRightPannelVisibleContext, AnswerStateContext, AnswerDetailsContext } from '../ContextProvider';


function Home() {
    //
    //전역변수
    const { state: {answerState}, actions:{setAnswerState} } = useContext(AnswerStateContext);
    const { state: {answerDetails}, actions:{setAnswerDetails} } = useContext(AnswerDetailsContext);
    //
    //

    const [answers, setAnswers] = useState(["","",""]);
    const [changedContentInfo, setChangedContentInfo] = useState(["", false, "", "", [0,0]]);
    const [selectedIdx, setSelectedIdx] = useState([0,0]);
    const [content, setContent] = useState("");
    const [requestMsg, setRequestMsg] = useState("");

    const handleRequestedHelp = async ([_requestMsg, _content, _selectedIdx]) => {
        console.log([_requestMsg, _content, _selectedIdx]);
        if (_requestMsg === "") {return;}
        if (_requestMsg === "selectedText") {
            setAnswerState("LOADING");
            setContent(_content);
            setSelectedIdx(_selectedIdx);
            setRequestMsg(_requestMsg);
            
            const txt = `유전자 가위 기술의 발달로 이제 우리는 1.12의 유전자를 편집하는 힘을 얻게 되었다? 이로 인해 유전적 질병의 치료뿐만 아니라 자질 강화는 물론이고 자녀의 유전자마저 결정할 수 있다? 바야흐로 인간은 자연 진화의 주인 자리에 올라 진정 만물의 영장이 되었다. 하지만 유전 정보 및 유전자 편집의 힘은 윤리적, 사회적으로 적지 않은 파장을 일으키고 있다. 생물 안정성이라는 기술상의 위험 요소는 물론이거나 이중 사용의 딜레마로 인한 바이오 테러 등의 생물 보안도 큰 사회적 이슈이다. 이러한 위험보다 더 심각한 것은 윤리물음이다. 동식물 대상의 유전자 편집은 동물권 물음을 야기하고, 인간 대상 유전자 편집은 치료를 넘어 자질 강화를 낳는 유전자 성형의 경우 정의와 연관하여 접근 기회의 공평성, 결과의 평등, 절차적 공정성 등의 윤리 원칙을 요구한다. 특히 맞춤아기의 경우처럼 다음 세대에 유전되는 생식세포 유전자 편집은 부모에 의한 자녀의 유전자 선택으로 부모와 자녀의 관계를 근본적으로 바꾸어 놓을 것이다. 윤리적 유전자 편집을 위한 민주적 숙의 과정이 그 어느 때보다 절실하게`;
            const idx = [28,30];            //유전자
            //단어/구 ai 검색
            const [isSucceed, answerList] = await getAnswerList3BetweenPhrase([txt, idx]);
            // const response = ApiCallBetweenPhrase([_content, _selectedIdx]);
            // console.log("response", response);
            
            if (isSucceed){
                // 정상 작동시
                setAnswers([answerList[0], answerList[1], answerList[2]]);
                setAnswerState("RECEIVED");
            } else {
                // 에러날 시
                setAnswerState("ERROR");
            }

        } else if (_requestMsg === "retry") {
            //단어/구 재검색
            if (requestMsg === "selectedText"){     
                console.log("이전 요청건이 'selectedText'인 경우");
                setAnswerState("LOADING");
            } else if (requestMsg === "afterText"){
                console.log("이전 요청건이 'afterText' 인 경우")
                setAnswerState("LOADING");
            }
        } 
    
    }

    const handleChangeContent = async (requestMsg, isApply, txt) => {
        if (requestMsg === "" || content === "") {;return;}
        if (requestMsg === "selectedText") {
            setChangedContentInfo([requestMsg, isApply, txt, content, selectedIdx]);
            // isLoading(false);
            // response([answer1, answer2, answer3]);

        }
    }

    const getAnswerList3BetweenPhrase = async ([wholeTxt, targetIdx]) => {
        return await CallBetweenPhrase([wholeTxt, targetIdx]).then(
            function (value) {
                //성공했을 때 실행
                return value;
          }, function (reason) {
              //실패했을 때 실행
                return reason;          //이거뭐야?
          });;

        //   [isSucceed, answerList]
    }

    return (
        <div>
            {/* <button onClick={handleApiCall}>gpt call</button> */}
            <MainPannel onRequestedHelp={handleRequestedHelp} changedContentInfo={changedContentInfo}/>
            <RightPannel onRequestedHelp={handleRequestedHelp} response={answers} onChangeContent={handleChangeContent}/>
        </div>
    );
}

export default Home;







