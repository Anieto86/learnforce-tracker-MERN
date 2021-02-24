import React from "react";
import { Link } from "react-router-dom";

//todo styled and icons
import styled from "styled-components";
import { MdPerson } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillTool } from "react-icons/ai";

//todo image
import threeBoxIcon from "../img/treboxIcon.png";

const NavbarStyles = styled.nav`
  margin-bottom: 30px;
  background-color: #18262f;
`;

const LogoStyle = styled.img`
  width: 30px;
  height: 30px;
`;

const ButtonStyle = styled.button`
  color: white;
  :hover {
    color: white;
  }
  float: left;
`;

const PersonsStyle = styled.button`
  background-color: #204257;
  color: white;
  :hover {
    color: white;
  }
`;

function Navbar() {
  return (
    <NavbarStyles className='navbar navbar-expand-lg navbar-light row'>
      <div className='container-fluid col'>
        <button className='btn btn ' style={{ backgroundColor: "#204257" }}>
          <Link className='navbar-brand ' to={"/"} style={{ color: "white" }}>
            <LogoStyle
              src={threeBoxIcon}
              alt=''
              className='d-inline-block align-top'
            />
            LearnForce
          </Link>
        </button>
        <div className="col">
          <ButtonStyle className='btn  '>
            <GiHamburgerMenu size={30} />
            Menu
          </ButtonStyle>
          <ButtonStyle className='btn   '>
            <AiFillTool size={30} />
            Tool
          </ButtonStyle>
          
    </div>
          <PersonsStyle className='btn btn  mr-sm-2'>
            <MdPerson size={30} />
          </PersonsStyle>
        
      </div>
    </NavbarStyles>
  );
}

export default Navbar;
