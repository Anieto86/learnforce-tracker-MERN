import React from "react";
import { Link } from "react-router-dom";

//todo styled and icons
import styled from "styled-components";
import { GoPlus } from "react-icons/go";

const BtnRequestStyled = styled.button`
float: left;
margin-top:20px;
background-color:#0599fd;
`;

function ButtonRequest() {
  return (
    <div className='container'>
      <Link to={"/newRequest"}>
        < BtnRequestStyled type='button' className='btn btn-primary btn-lg'>
          <GoPlus /> Request new feature
        </ BtnRequestStyled>
      </Link>
    </div>
  );
}

export default ButtonRequest;
