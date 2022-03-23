import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { FaUserCircle } from "react-icons/fa"
import routes from "../../routes";
import logo from '../../assets/logo.png';
import NavContainer from "./NavContainer";
import NavItem from "./NavItem";
import NavList from "./NavList";
import Logo from "./Logo"
import { logout } from "../../store/user"


const Navigation = styled.nav`
position: fixed;
height: 80px;
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
`;

const Logout = styled.div`
cursor: pointer;
`

function Navbar() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const dispatch = useDispatch()
  const showNavList = isLoggedIn ? (
    <NavList>
      <NavItem>
        <Logout onClick={() => dispatch(logout())}>Logout</Logout>
      </NavItem>
      <NavItem>
        <FaUserCircle />
      </NavItem>
    </NavList>
  ) : (
    <NavList>
      <NavItem>
        <Link to={routes.login}>Login</Link>
      </NavItem>
      <NavItem>
        <Link to={routes.signup}>Signup</Link>
      </NavItem>
    </NavList>
  )

  return (
    <Navigation>
      <NavContainer>
        <Link to={routes.main}>
          <Logo src={logo} />
        </Link>
        <Link to={routes.main}>
          3 Minutes for 1 Minute
        </Link>
      </NavContainer>
      {showNavList}
    </Navigation>
  )
}

export default Navbar;
