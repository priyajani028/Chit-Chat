import React, { useState } from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'


function ChatInput({handleSendMsg}) {
    const [showEmojiPicker, setShowEmojiPicker] =useState(false);
    const [msg,setMsg]=useState('');
    // const fileInputRef = useRef(null);
    const [photo, setPhoto] = useState(null);
    const handleEmojiPickerHideShow=()=>{
        //console.log(showEmojiPicker);
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (event, emojiObj)=>{
        const {emoji} = emojiObj;
        let message =msg;
        message+=emoji;
        setMsg(message);
        //console.log(message);
        //console.log(emoji);
    }
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            const dataURL = reader.result;
            setPhoto(dataURL);
          };
          reader.readAsDataURL(file);
        }
      };

    // const sendChat=(event)=>{
    //     event.preventDefault();
    //     if(msg.length>0){
    //         handleSendMsg(msg);
    //         setMsg('')
    //     }
    // }
    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0 || photo) {
          handleSendMsg(msg, photo);
          setMsg('');
          setPhoto(null);
        }
      };
  return (
    <Container>
        <div className="button-container">
            <div className="emoji">
                <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>{
                    showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />
                }
            </div>
        </div>
        <form className='input-container' onSubmit={(e)=>sendChat(e)}>
            <input type="text" placeholder="type your message here" value={msg} onChange={(e)=>setMsg(e.target.value)} />

            <label className="file-upload-label" htmlFor="file-upload">
          <span>Upload Photo</span>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            // ref={fileInputRef}
            onChange={handleFileUpload}
          />
        </label>

            <button className='submit'>
                <IoMdSend/>
            </button>
            

        </form>
    </Container>
  )
}

const Container=styled.div`
display: grid;
grid-template-columns: 5% 95%;
align-items:center;
background-color: #003554;
padding: 0 2rem;
@media screen and (min-width: 720px) and (max-width: 1080px){
    padding: 0 1rem;
    gap: 1rem;
}

.button-container{
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji{
        position: relative;
        svg{
            font-size: 1.5rem;
            color: #ffff00c8;
            cursor: pointer;
        }
        .emoji-picker-react{
            position: absolute;
            top: -350px;
            background-color: #080420;
            box-shadow: 0 5px 10px #00a6fb;
            border-color: #00a6fb;
            .emoji-scroll-wrapper::-webkit-scrollbar{
                background-color: #080420;
                width: 5px;
                &-thumb{
                    background-color: #00a6fb;
                }
            }
            .emoji-categories{
                button{
                    filter: contrast(0);
                }
            }
            .emoji-search{
                background-color: transparent;
                border-color: #00a6fb;
            }
            .emoji-group:before{
                background-color: #080420;
            }
        }
    }
}
.input-container{
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #d9d9d9;
    input{
        width: 90%;
        height: 60%;
        background-color: transparent;
        color: #051923;
        border: none;
        padding-left:1rem;
        font-size: 1.2rem;
        &::selection{
            background-color: #00a6fb;
        }
        &:focus{
            outline: none;
        }
    }
    button{
        padding: 0.3rem 2rem;
        border-radius: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #00a6fb;
        border: none;
        @media screen and (min-width: 720px) and (max-width: 1080px){
            padding: 0.3rem 1rem;
            svg{
                font-size:1rem;
            }
        }
        svg{
            font-size: 2rem;
            color: white;
        }
    }
}
`;

export default ChatInput

