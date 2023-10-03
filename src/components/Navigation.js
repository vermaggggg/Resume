import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from 'react-router-dom';
import resume_logo2 from '../assets/Images/online_cv1.png';
import ThemeSwitch from "./ThemeSwitch";
function Navigation() {
  return (
    <Navbar  variant="light" className="border-bottom header_sec p-0" sticky="top">
      <Container>
      <Navbar.Brand>
          <NavLink to="/" className="text-decoration-none text-black text-color"><img src={resume_logo2} alt="logo"/></NavLink>
        </Navbar.Brand>
      <Nav className="me-auto">
          <NavLink to="/" className="mx-2 text-decoration-none text_color">Home</NavLink>
          {/* <NavLink to="#" className="mx-2 text-decoration-none text-black">About</NavLink> */}
        </Nav>
       <ThemeSwitch/>
       
      </Container>
    </Navbar>
  );
}

export default Navigation;
