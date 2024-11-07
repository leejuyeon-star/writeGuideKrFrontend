// import PropTypes from "prop-types";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import '../styles/MainNote.css'
// import { CSSTransition } from 'react-transition-group';

// function MainNote({ isRightPannelVisible, onRequestedHelp }) {
//     const [content, setContent] = useState("");
//     const [isReady, setIsReady] = useState(false);
//     const [selectedText, setSelectedText] = useState("");

//     const [shouldExit, setShouldExit] = useState(false);
//     const [isAnimating, setIsAnimating] = useState(false);



      

//     useEffect(() => {
//         moveNoteAnimation(isRightPannelVisible);
//     }, [isRightPannelVisible]);

//     const moveNoteAnimation = (isRightPannelVisible) => {
//         if (isRightPannelVisible) {
//             setShouldExit(false); // Exit 상태를 true로 설정
//             setIsAnimating(!isAnimating);
            
//         } else {
//             setShouldExit(true); // Exit 상태를 false로 설정
//         }
//     };

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
//     }


//     const findselectedText = () => {
//         const selection = window.getSelection();
//         if (selection.length <= 0) {return;}
//         const selectedText = selection.toString().trim();
//         setSelectedText(selectedText);
        
//     };    


//     const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
//   // 드래그된 텍스트를 감지하여 블럭 표시
//   const onMouseUp = () => {
//     // findselectedText();
//     const selection = window.getSelection();
//     const selectedText = selection.toString().trim();
//     let withoutspace = selectedText.replace(/\s+/g, '');       
//     if (selection.length <= 0 || withoutspace.length <= 2) {
//         setSelectedText('');
//         return;
//     }
//     setSelectedText(selectedText);

//     if (selectedText) {
//         const range = selection.getRangeAt(0);
//         const rect = range.getBoundingClientRect();
  
//         // 버튼의 위치 설정 (textarea 안에서)
//         setButtonPosition({
//           top: rect.bottom + window.scrollY, // 선택한 텍스트의 아래쪽
//           left: rect.right + window.scrollX // 선택한 텍스트의 오른쪽
//         });
//     } else {
//         setSelectedText(''); // 선택된 텍스트가 없으면 초기화
//     }
//   };

//   const onHelpDraggedClick =() => {
//     let withoutspace = selectedText.split(' ').join('');
//     console.log(withoutspace.length);
//     if (withoutspace.length < 2) {
//         setSelectedText('');
//         return;
//     }
//     onRequestedHelp(true);
//   }


//     // const onSubmit = (event) => {
//     //     event.preventDefault();           //to prevent auto submit
//     //     if (content === "") {return;}
//     // //   setToDos((currentArray) => [content, ...currentArray]);
//     // //   setToDo("");
//     // }


    
    
//     MainNote.propTypes = {
//         isRightPannelVisible: PropTypes.bool.isRequired,
//     };
    
//     console.log("드래그한 글자", selectedText);
//     return (
//         <CSSTransition
//         in={isAnimating}
//         timeout={700}
//         // classNames={{
//         //     enter: 'movenote-enter',
//         //     enterActive: 'movenote-enter-active',
//         //     exit: shouldExit ? 'movenote-exit' : '',
//         //     exitActive: shouldExit ? 'movenote-exit-active' : '',
//         // }}
//         classNames={"movenote"}
//         unmountOnExit={false} // 요소를 DOM에서 제거하지 않음
//         >
//             <div className="main-note-container">
//                 <div className="mn-sub-container">
//                     <header>
//                         <h2 onMouseUp={onMouseUp}>글쓰기</h2>
//                     </header>

//                     <div 
//                         contentEditable 
//                         className="mn-textarea" 
//                         value={content} 
//                         onInput={onInput} 
//                         onMouseUp={onMouseUp} 
//                         type="text" 
//                         placeholder='Write your content..' 
//                     >
//                         {selectedText ? 
//                             <button 
//                                 className="mn-help-dragged-button" 
//                                 style={{
//                                     top: buttonPosition.top, 
//                                     left: buttonPosition.left,
//                                 }}
//                                 onClick={onHelpDraggedClick}>
//                             </button> : null}
//                     </div>
//                 </div>
//             </div>

//         </CSSTransition>

//     );
// }


// export default MainNote;