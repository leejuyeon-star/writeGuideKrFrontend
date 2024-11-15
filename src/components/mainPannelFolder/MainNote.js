import PropTypes from "prop-types";
import { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import '../../styles/mainPannelFolder/MainNote.css'
import { Transition } from 'react-transition-group';
import { IsRightPannelVisibleContext, AnswerStateContext } from '../../ContextProvider';
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


function MainNote({ onRequestedHelp, changedContentInfo }) {
    const [content, setContent] = useState("");
    const [isReady, setIsReady] = useState(false);
    const [changedContent, setChangedContent] = useState("");
    const [isDraggedButtonOn, setIsDraggedButtonOn] = useState(false);
    const [isCursorButtonOn, setIsCursorButtonOn] = useState(false);
    const contentRef = useRef(null);
    const { state: {answerState}, actions:{setAnswerState} } = useContext(AnswerStateContext);
    const [wholeTextCountWithoutSpace, setWholeTextCountWithoutSpace] = useState(0);
    const [wholeTextCountWithSpace, setWholeTextCountWithSpace] = useState(0);
    const copyImgUrl = process.env.PUBLIC_URL + "/images/copy.png";
    const shareImgUrl = process.env.PUBLIC_URL + "/images/share.png";
    const backWhiteImgUrl = process.env.PUBLIC_URL + "/images/go_back_white.png";
    const forwardWhiteImgUrl = process.env.PUBLIC_URL + "/images/go_forward_white.png";
    const backBlackImgUrl = process.env.PUBLIC_URL + "/images/go_back_black.png";
    const forwardBlackImgUrl = process.env.PUBLIC_URL + "/images/go_forward_black.png";

    //기본 내용으로 돌아가기
    useEffect(() => {
        // 기본 텍스트를 설정합니다.
        if (changedContent === "" && contentRef.current) {
            contentRef.current.innerText = content;
        }
    }, [changedContent]);

    useEffect(() => {
        if (content.length === 0 || content === `\n`) {
            setWholeTextCountWithoutSpace(0);
            setWholeTextCountWithSpace(0);
        } else {
            setWholeTextCountWithoutSpace(content.replace(/(\s*)/g, "").length);
            setWholeTextCountWithSpace(content.replace(/(\n*)/g, "").length);
        }
    }, [content]);

    //문자열 바꾸라고 하면 내용 바꾸기
    useEffect(() => {
        const [_requestMsg, isApply,changingTxt,_content,selectedIdx] = changedContentInfo;
        console.log(_requestMsg, isApply,changingTxt,_content,selectedIdx);
        if (_requestMsg === "") {return;}
        if (_requestMsg === "selectedText") {
            if (changingTxt === "") {       //기존 내용으로 돌아와야 할 경우
                setChangedContent("");
                return;
            }
            if (isApply) {
                // console.log("진짜바꾸기");
                const leftTxt = _content.slice(0,selectedIdx[0]);
                const rightTxt = _content.slice(selectedIdx[1], );
                setContent(`${leftTxt} ${changingTxt} ${rightTxt}`);
                setChangedContent("");
            } else {
                const leftTxt = _content.slice(0,selectedIdx[0]);
                const rightTxt = _content.slice(selectedIdx[1], );
                // console.log(`${leftTxt} ${changingTxt} ${rightTxt}`);
                setChangedContent(`${leftTxt} ${changingTxt} ${rightTxt}`);
            }
        } else if (_requestMsg === "afterSentence") {
            if (changingTxt === "") {       //기존 내용으로 돌아와야 할 경우
                setChangedContent("");
                return;
            }
            if (isApply) {
                // console.log("진짜바꾸기");
                setContent(`${_content} ${changingTxt}`);
                setChangedContent("");
            } else {
                // console.log(`${_content} ${changingTxt}`);
                setChangedContent(`${_content} ${changingTxt}`);
            }
        }
    }, [changedContentInfo]);

    //ai 요청, 패널 열라고 하기
    const requestedHelp = (requestMsg, _selectedIdx) => {
        //현재 패널 열려있으면 고정, 아니면 이동
        onRequestedHelp([requestMsg, content, _selectedIdx]);
        // if (!isRightPannelVisible){
            // onRightPannelVisible(true);
            // setIsRightPannelVisible(true);
        // }
        setIsDraggedButtonOn(false);

    };

    //타자칠때
    const [cursorButtonPosition, setCursorButtonPosition] = useState({ top: 0, left: 0 });
    const onInput = () => {
        setContent(contentRef.current.innerText);
        // setContent(event.target.innerText);
        setIsCursorButtonOn(true);
        relocateCursorButton(window.getSelection());

        if (content.length < 10) 
            {return;}
        else {
            if (!isReady) {
                // console.log(content.length)
                setIsReady(true);
            }
        }
    };

    //드래그한 문자의 index 찾기
    const findSelectedIdx = (selection) => {         // 선택된 단어의 시작 인덱스 찾기
        const range = selection.getRangeAt(0);

        // console.log(range.startOffset, range.endOffset);
        // return [range.startOffset, range.endOffset];
        
        const textNode = range.startContainer; // 선택한 텍스트의 시작 노드
        const text = textNode.nodeValue; // 텍스트 노드의 값
        const selectedText = findSelectedText(selection);
        const startIndex = text.indexOf(selectedText, range.startOffset);
        const endIndex = startIndex + selectedText.length;
        
        // setSelectedWordInfo(`선택된 단어: "${selectedText}", 시작 인덱스: ${startIndex}, 끝 인덱스: ${endIndex}`);
        return [startIndex, endIndex];
    }


    
    //드래그한 문자 찾기
    const findSelectedText = (selection) => {                
         return selection.toString().trim();       //.trim()붙여도돼?
    };    
    
    //ai 분석 가능한 문자인지 확인
    const isValidSelectedText = (selection) => {
        if (selection.rangeCount > 0) {
            const selectedText = findSelectedText(selection);
            let withoutspace = selectedText.replace(/\s+/g, '');       
            if (selectedText.length <= 0 || withoutspace.length <= 2) {
                // setSelectedText('');
                return false;
            }
            return true;
        }

    }

    //단어 ai 요청 버튼 위치 세팅
    const relocateDraggedButton = (selection) => {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        // 버튼의 위치 설정 (textarea 안에서)
        setDraggedButtonPosition({
            top: rect.bottom + window.scrollY, // 선택한 텍스트의 아래쪽
            left: rect.right + window.scrollX // 선택한 텍스트의 오른쪽
        });
    }

    //끝문장 요청 버튼 위치 세팅
    const relocateCursorButton = (selection) => {
        const range = selection.getRangeAt(0);
        const cursorIdx = range.endOffset; // 선택한 텍스트의 시작 노드
        const rect = range.getBoundingClientRect();

        // 버튼의 위치 설정 (textarea 안에서)
        setCursorButtonPosition({
            top: rect.bottom + window.scrollY, // 선택한 텍스트의 아래쪽
            left: rect.right + window.scrollX // 선택한 텍스트의 오른쪽
        });
    }

    const [draggedButtonPosition, setDraggedButtonPosition] = useState({ top: 0, left: 0 });
    // 드래그된 텍스트를 감지하여 버튼 세팅
    const onMouseUp = () => {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const cursorEndOffset = range.endOffset; // 선택한 텍스트의 시작 노드
        const cursorStartOffset = range.startOffset; // 선택한 텍스트의 시작 노드
        const dragCount = cursorEndOffset - cursorStartOffset;
        if (cursorEndOffset <= 0) {               //처음 노트 클릭시 버튼 미생성
            setIsCursorButtonOn(false);
            setIsDraggedButtonOn(false);
        } else {
            if ( dragCount > 0) {
                //드래그 한 경우
                //커서버튼 지우기
                setIsCursorButtonOn(false);
                if (isValidSelectedText(selection)) {
                    //3글자 이상인 경우
                    //드래그버튼 생성
                    relocateDraggedButton(selection);
                    setIsDraggedButtonOn(true);
                } else {
                    //3글자 이하인 경우
                    //드래그버튼 지우기
                    setIsDraggedButtonOn(false);
                }
            } else {
                //드래그 안한 경우
                //커서버튼 생성
                setIsDraggedButtonOn(false);
                relocateCursorButton(selection);
                setIsCursorButtonOn(true);
            }
        }
    };

    //단어 ai 버튼 클릭시
    const onDraggedButtonClick = () => {
        const selection = window.getSelection();
        const selectedIdx = findSelectedIdx(selection);
        console.log("selectedIdx");
        console.log(selectedIdx);

        requestedHelp("selectedText", selectedIdx);
        setIsDraggedButtonOn(false);
    };
    
    const onCursorButtonClick = () => {
        console.log("click!");
        // console.log(e);
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const cursorIdx = 2; // 선택한 텍스트의 시작 노드
        // const cursorIdx = range.endOffset; // 선택한 텍스트의 시작 노드
        console.log(range);
        console.log(cursorIdx);
        requestedHelp("afterSentence", cursorIdx);
        setIsCursorButtonOn(false);
    }


    const onClickCopyButton = async (event) => {
        try {
            hideTooltip(event);
            await navigator.clipboard.writeText(content);
            // alert('클립보드에 링크가 복사되었습니다.');
            toast.success("복사 완료", {
                position: "top-center",     //위치
                autoClose: 700,        //소요시간
                closeButton: false,     //닫기버튼 생성
                progress: false,        //
                // transition: 'flip',
            });
        } catch (e) {
            // alert('복사에 실패하였습니다. 다시 시도해주세요.');
            toast.warn("복사 실패. 다시 시도해주세요.", {
                position: "top-center",     //위치
                autoClose: 1000,        //소요시간
                // closeButton: false,     //닫기버튼 생성
                progress: false,        //
                // transition: 'flip',
            });
        }
    };

    const onClickBackButton = (event) => {
        hideTooltip(event);
    }
    const onClickForwardButton = (event) => {
        hideTooltip(event);
    }
    const onClickShareButton = (event) => {
        hideTooltip(event);
    }

    const hideTooltip = (event) => {
        const classList = event.currentTarget.classList;
        if (!classList.contains('clicked')){
            classList.toggle('clicked');
        }
    }

    



    return (
            // <div className="mn-sub-container">
            <>
                <header className="mn-header">
                    <button className="mn-back-button" onClick={onClickBackButton} tooltip="되돌리기" flow="up">
                        <img src={backWhiteImgUrl} className="mn-back-img"/>
                    </button>
                    <button className="mn-forward-button" onClick={onClickForwardButton} disabled={true} tooltip="다시 실행" flow="up">
                        <img src={forwardWhiteImgUrl} className="mn-forward-img"/>
                    </button>
                    <button className="mn-copy-button" onClick={onClickCopyButton} tooltip="복사하기" flow="up">
                        <img src={copyImgUrl} className="mn-copy-img"/>
                    </button>
                    <button className="mn-share-button" onClick={onClickShareButton} tooltip="공유하기" flow="up">
                        <img src={shareImgUrl} className="mn-share-img"/>
                    </button>
                </header>
                {changedContent ? 
                    <div                                     
                    className="mn-textarea" 
                    value={changedContent}
                    type="text" 
                    >{changedContent}</div>
                : 
                    <div 
                        ref={contentRef}
                        contentEditable
                        className="mn-textarea" 
                        // value={content}
                        onInput={onInput} 
                        onMouseUp={onMouseUp} 
                        type="text" 
                        placeholder='Write your content..' 
                        suppressContentEditableWarning={true}
                    > 
                    </div>
                }
                {isDraggedButtonOn ? 
                    <button 
                        className="mn-help-dragged-button" 
                        style={{
                            top: draggedButtonPosition.top, 
                            left: draggedButtonPosition.left,
                        }}
                        onClick={onDraggedButtonClick}>
                    </button> : null
                }
                
                {isCursorButtonOn ? 
                    <button 
                        className="mn-help-cursor-button" 
                        style={{
                            top: cursorButtonPosition.top, 
                            left: cursorButtonPosition.left,
                        }}
                        onClick={onCursorButtonClick}
                    >
                    </button> : null
                }
                <div className="mn-bottom-container">
                    <div className="mn-count-wholeText">{wholeTextCountWithSpace}자 (띄어쓰기 미포함 {wholeTextCountWithoutSpace}자)</div>    
                </div>
        </>
            // </div>
    );
    



    
}


export default MainNote;

