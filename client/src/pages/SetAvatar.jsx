import React, {useState, useEffect} from 'react'
import axios from "axios";
import styled from 'styled-components'
import {useNavigate} from "react-router-dom";
import loader from "../assets/loader.gif";
import {ToastContainer, toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from '../utils/APIRoutes';
import {Buffer} from "buffer";

function SetAvatar() {
    const api = "https://api.multiavatar.com";
    const navigate= useNavigate();

    const [avatars, setAvatars]= useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar]= useState(undefined);

    const toastOptions={
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
      };

      useEffect(()=>{
        if(!localStorage.getItem('chat-app-user')){
          navigate("/login");
        }
      },[]);

    const setProfilePicture = async()=>{
        //console.log("SelectedAvatar : ",selectedAvatar);
        if(selectedAvatar===undefined){
            toast.error("Please select an avatar.", toastOptions);
        }else{
            //try{
                const user=await JSON.parse(localStorage.getItem('chat-app-user'));

                const {data}= await axios.post(`${setAvatarRoute}/${user._id}`,{
                    image: avatars[selectedAvatar],
                });
                //console.log("data:",data);
                //console.log("user : ",user);
                if(data.isSet){
                    user.isAvatarImageSet=true;
                    user.avatarImage=data.image;
                    localStorage.setItem("chat-app-user",JSON.stringify(user));
                    navigate("/");
                }else{
                    toast.error("Error setting avatar, Please try again", toastOptions);
                }
           // }
            // catch (e){
            //     console.error(e);
            //     toast.error("An error occurred while setting the avatar.", toastOptions);
            // }
        }
    };

    useEffect(()=>{
        
        const fetchAvatars= async() =>{
            const data=[];
            for(let i=0;i<4;i++){
                // const image= await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                // const image= await axios.get(`${api}/${Math.round(Math.random() * 1000)}?apikey=${process.env.AVATAR_API}`);



                const image = await axios.get( `${api}/${Math.round(Math.random() * 1000)}`);
                const buffer= new Buffer(image.data);
                data.push(buffer.toString('base64'));
            }
        setAvatars(data);
        setIsLoading(false);
       };
        fetchAvatars();
        //console.log(setAvatars);
        //console.log(isLoading);
      },[]);
  return (
    <>
    {
        isLoading? <Container>
            <img src={loader} alt="loader" className='loader'/>
        </Container> : (
        <Container>
            <div className="title-container">
                <h1>Pick an avatar as your profile picture.</h1>
            </div>
            <div className="avatars">{
                avatars.map((avatar, index)=>{
                    return(
                        <div key={index} className={` avatar ${selectedAvatar ===index ? "selected" : ""}`}>
                            <img src={`data:image/svg+xml;base64, ${avatar} `} alt="avatar" onClick={()=> setSelectedAvatar(index)}/>
                        </div>
                    )
                })
            }</div>
            <button className='submit-btn' onClick={setProfilePicture}>Set as Profile Picture.</button>
        </Container>
        )
    }
        <ToastContainer/>
    </>
  )
}

const Container =styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 3rem;
background-color: #051923;
width: 100vw;
height: 100vh;
.loader{
    max-inline-size: 100%;
}
.title-container{
    h1{
        color: white;
    }
}
.avatars{
    display:flex;
    gap: 2rem;
    .avatar{
        border: 0.4rem solid transparent;
        padding: 0.4rem;
        display: flex;
        justify-content: center;
        border-radius: 5rem;
        align-items: center;
        transition: 0.5s ease-in-out;
        img{
            height: 6rem;
        }
    }
    .selected{
        border: 0.4rem solid #00a6fb;
    }
}
    .submit-btn {
        background-color: #00a6fb;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        &:hover {
          background-color: #f7b801;
        }
      }
}
`;

export default SetAvatar