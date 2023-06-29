import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components';
import axios from 'axios'; //for api calling
import { useNavigate } from 'react-router-dom'; //useNavigate hook
import { allUsersRoute, host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import io from 'socket.io-client';

function Chat() {
  const socket=useRef();
  const navigate= useNavigate();
  const [contacts, setContacts]=useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat]= useState(undefined);
  const [isLoaded, setIsLoaded]= useState(false);

  useEffect(()=>{
    const checkUser = async()=>{
      if(!localStorage.getItem("chat-app-user")){
        navigate("/login");
      }else{
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
      }
    }
    checkUser();
  }, []); // calling once when component is created

  useEffect(()=>{
    if(currentUser){
      socket.current=io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  },[currentUser])

  useEffect(()=>{
    const checkCurrentUser= async()=>{
      if(currentUser){
        console.log("currentUser");
        if(currentUser.isAvatarImageSet){
          const data=await axios.get(`${allUsersRoute}/${currentUser._id}`);
          //console.log(data.data);
          setContacts(data.data);
        }else{
          navigate("/setAvatar");
        }
      }
    }
    checkCurrentUser();
  }, [currentUser]); 

  const handleChatChange=(chat)=>{
    setCurrentChat(chat);
  }
  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
        {
          isLoaded && currentChat===undefined?(
            <Welcome currentUser={currentUser}/>
          ):(
            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
          )
        }
      </div>
    </Container>
  )
}

const Container= styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap :1rem;
  background-color: #4059ad;
  .container{
    height: 100vh;
    width: 100vw;
    background-color: #051923;
    display : grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 180px){
      grid-template-columns: 35% 65%;
    };

  }
`;

export default Chat