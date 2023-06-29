import React from 'react';
import styled from 'styled-components';
import {BiPowerOff} from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Logout() {
    const navigate=useNavigate();
    const handleClick= async()=>{
        localStorage.clear();
        navigate("/login");
    }
  return (
    <Button onClick={handleClick}>
        <BiPowerOff/>
    </Button>
  )
}

const Button = styled.div`
disply: flex;
justify-content: center;
align-items: center;
padding: 0.5rem;
background-color: #00a6fb;
border-radius: 0.5rem;
border: none;
cursor: pointer;
svg{
    font-szie: 1.3rem;
    color: #ebe7ff;
}
`;

export default Logout