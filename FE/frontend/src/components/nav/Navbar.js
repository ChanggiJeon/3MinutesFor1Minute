import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import routes from "../../routes";
import logo from '../../assets/logo.png';
import NavContainer from "./NavContainer";
import NavItem from "./NavItem";
import NavList from "./NavList";

const Navigation = styled.nav`
  position: sticky;
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
`;

const Logo = styled.img`
  width: 55px;
  height: 55px;
  margin: 15px;
`

function Navbar() {
  return (
    <Navigation>
      <NavContainer>
        <Logo src={logo} />
        3 Minutes for 1 Minute
      </NavContainer>
      <NavList>
        <NavItem>
          <Link to={routes.login}>Login</Link>
        </NavItem>
        <NavItem>
          <Link to={routes.signup}>Signup</Link>
        </NavItem>
      </NavList>
    </Navigation>
  )
}

export default Navbar;
