// import PropTypes from "prop-types";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import '../styles/MainNote.css'
// import { Transition } from 'react-transition-group';

// function MainNote({ onRequestedHelp }) {
//     const [content, setContent] = useState("");
//     const [isReady, setIsReady] = useState(false);
//     // const [selectedText, setSelectedText] = useState("");
//     const [selectedIdx, setSelectedIdx] = useState([0,0]);
//     const [isRightPannelVisible, setIsRightPannelVisible] = useState(false);
//     const [isDraggedButtonOn, setIsDraggedButtonOn] = useState(false);

//     const requestedHelp = (requestMsg, _content, _selectedIdx) => {
//         //현재 패널 열려있으면 고정, 아니면 이동
//         onRequestedHelp([requestMsg, _content, _selectedIdx]);
//         if (!isRightPannelVisible){
//             setIsRightPannelVisible(true);
//         }
//         setIsDraggedButtonOn(false);

//     };

//     // useEffect(() => {
//     //     moveNoteAnimation(isRightPannelVisible);
//     // }, [isRightPannelVisible]);

//     // const moveNoteAnimation = (isRightPannelVisible) => {
//     //     if (isRightPannelVisible) {
//     //         // setShouldExit(false); // Exit 상태를 true로 설정
//     //         // setIsAnimating(!isAnimating);

            
//     //     } else {
//     //         // setShouldExit(true); // Exit 상태를 false로 설정
//     //     }
//     // };

//     const onInput = (event) => {
//         setContent(event.target.innerText);
//         if (content.length < 10) 
//             {return;}
//         else {
//             if (!isReady) {
//                 // console.log(content.length)
//                 setIsReady(true);
//             }
//         }
//     };


//     const findselectedText = (selection) => {
//         // const selectedText = selection.toString().trim();
//         // let withoutspace = selectedText.replace(/\s+/g, '');       
//         // if (selection.length <= 0 || withoutspace.length <= 2) {
//             //     setSelectedText('');
//             //     setIsDraggedButtonOn(false);
//             //     return;
//             // }
//             // setSelectedText(selectedText);
            
//             if (selection.rangeCount > 0) {
//                 let withoutspace = selectedText.replace(/\s+/g, '');       
//                 if (selection.length <= 0 || withoutspace.length <= 2) {
//                     // setSelectedText('');
//                     setIsDraggedButtonOn(false);
//                     return;
//                 }
                
//             const selectedText = selection.toString().trim();       //.trim()붙여도돼?
//             const range = selection.getRangeAt(0);
//             const textNode = range.startContainer; // 선택한 텍스트의 시작 노드
//             const text = textNode.nodeValue; // 텍스트 노드의 값

//             // 선택된 단어의 시작 인덱스 찾기
//             const startIndex = text.indexOf(selectedText, range.startOffset);
//             const endIndex = startIndex + selectedText.length;

//             setSelectedWordInfo(`선택된 단어: "${selectedText}", 시작 인덱스: ${startIndex}, 끝 인덱스: ${endIndex}`);
//             setSelectedIdx([startIndex, endIndex]);
//             setSelectedText(selectedText);
//         }
//         return selectedText;
        
//     };    


//     const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
//     // 드래그된 텍스트를 감지하여 블럭 표시
//     const onMouseUp = () => {
//         const selection = window.getSelection();
//         const selectedText = findselectedText(selection);

//         if (selectedText) {
//             const range = selection.getRangeAt(0);
//             const rect = range.getBoundingClientRect();
    
//             // 버튼의 위치 설정 (textarea 안에서)
//             setButtonPosition({
//             top: rect.bottom + window.scrollY, // 선택한 텍스트의 아래쪽
//             left: rect.right + window.scrollX // 선택한 텍스트의 오른쪽
//             });
//             setIsDraggedButtonOn(true);
//         // } else {
//             // setSelectedText(''); // 선택된 텍스트가 없으면 초기화
//             // setIsDraggedButtonOn(false);
//         }
//     };

//     const onHelpDraggedClick =() => {
//         let withoutspace = selectedText.split(' ').join('');
//         console.log(withoutspace.length);
//         if (withoutspace.length < 2) {
//             setSelectedText('');
//             return;
//         }
//         requestedHelp("selectedText", content, );
//         setIsDraggedButtonOn(false);
//     };
        
//     MainNote.propTypes = {
//         onRequestedHelp: PropTypes.array,
//     };
    
//     console.log("드래그한 글자", selectedText);



//     const defaultStyle = {
//         transition: `width 700ms ease-out`,
//     };

//     const transitionStyles = {
//         entering: { width: `100vw` },
//         entered: { width: `66vw` },
//         exiting: { width: `66vw` },
//         exited: { width: `100vw` },
        
//     };

//         return (
//             <>
//             <Transition in={isRightPannelVisible} timeout={700}>
//                 {(state) => (
//                 <div
//                     style={{
//                     ...defaultStyle,
//                     ...transitionStyles[state]
//                     }}
//                 >
//                     <div className="main-note-container">
//                         <div className="mn-sub-container">
//                             <header>
//                                 <h2 onMouseUp={onMouseUp}>글쓰기</h2>
//                             </header>
                            
//                             <div 
//                                 contentEditable
//                                 className="mn-textarea" 
//                                 value={content} 
//                                 onInput={onInput} 
//                                 onMouseUp={onMouseUp} 
//                                 type="text" 
//                                 placeholder='Write your content..' 
//                             >
//                                 {isDraggedButtonOn ? 
//                                     <button 
//                                         className="mn-help-dragged-button" 
//                                         style={{
//                                             top: buttonPosition.top, 
//                                             left: buttonPosition.left,
//                                         }}
//                                         onClick={onHelpDraggedClick}>
//                                     </button> : null}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 )}
//             </Transition>



            


//         </>
//         );
    



    
// }


// export default MainNote;

