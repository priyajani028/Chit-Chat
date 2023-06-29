import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';

function Contacts({contacts, currentUser, changeChat}) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentImage]= useState(undefined);
    const [currentSelected, setCurrentSelected]= useState(undefined);
    
    useEffect(()=>{
        //console.log(contacts);
        if(currentUser){
            setCurrentImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    },[currentUser]); //currentUser is a dependency array which means if you don't include or pass empty array [], the effect will only run once when component mounts and it won't re-triggered if the currentUser changes. On passing the array of currentUser, it ensures that the effect updates the state variables like setCurrentImage and setCurrentUserName whenever currentUSer changes.
    const changeCurrentChat=(index, contact)=>{
        //console.log('Selected Contact:', contact);
        setCurrentSelected(index);
        changeChat(contact);
    }
  return (
    <>{
        currentUserImage && currentUserName && (
            <Container>
                <div className="brand">
                    <img src={Logo} alt="logo" />
                    <h3>Chit-Chat</h3>
                </div>
                <div className="contacts">
                    {
                        contacts.map((contact, index) =>{
                            return (
                                <div key={index} className={`contact ${index=== currentSelected ? "selected" : ""}`}  onClick={()=> changeCurrentChat(index, contact)}>
                                    <div className="avatar">
                                        <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="" />
                                    </div>
                                    <div className="username">
                                        <h4>{contact.username}</h4>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="current-user">
                    <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
                    </div>
                    <div className="username">
                        <h3>{currentUserName}</h3>
                    </div>
                </div>
            </Container>
        )
    }
    </>
  )
}

const Container= styled.div`
display: grid;
grid-template-rows: 10% 75% 15%;
overflow: hidden;
background-color: #051923;
.brand{
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img{
        height: 2rem;
    }
    h3{
        color: white;
        text-transform: uppercase;
    }
}
.contacts{
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar{
        width: 0.2rem;
        &-thumb{
            background-color: #62b6cb;
            width: 01.rem;
            border-radius: 1rem;
        }
    }

    .contact{
        background-color: #013a63;
        min-height: 5rem;
        cursor: pointer;
        width: 90%;
        border-radius: 0.2rem;
        padding: 0.4rem;
        display: flex;
        gap: 1rem;
        align-items: center;
        transition: 0.5s ease-in-out;
        .avatar{
            img{
                height: 3rem;
            }
        }
        .username{
            h4{
                color: white;
            }
        }
        &.selected{
            background-color: #00a6fb ;
        }
    }
}

.current-user{
    background-color: #0582ca;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar{
        img{
            height: 4rem;
            max-inline-size: 100%;
        }
    }
    .username{
        h3{
            color: white;
        }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px){
        gap: 0.5rem;
        .username{
            h3{
                font-size: 1rem;
            }
        }
    }
}

`;

export default Contacts