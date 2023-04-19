import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/logo.jpg";
import { getAuthUser, removeAuthUser } from "../helper/Storage";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const auth = getAuthUser();
  const Logout = () => {
    removeAuthUser();
    navigate("/");
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link className="nav-link" to="/">
            <Navbar.Brand>
              <img
                src={logo}
                height="30"
                className="d-inline-block align-top"
                alt="Eary logo"
              />
              {" Eary"}
            </Navbar.Brand>
          </Link>

          <Nav className="me-auto">
            {!auth && (
              <>
                <Link className="nav-link" to="contuct">
                  contuct us
                </Link>
                <Link className="nav-link" to="about">
                  about
                </Link>
              </>
            )}
          </Nav>
          <Nav className="me-auto">
            {auth && auth.role === 1 && (
              <>
                <Link className="nav-link" to={"/manage-user"}>
                  Manage user
                </Link>
                <Link className="nav-link" to={"/manage-question"}>
                  Manage question
                </Link>
              </>
            )}
          </Nav>
          <Nav className="ms-auto">
            {!auth && (
              <>
                <Link className="nav-link" to="login">
                  login
                </Link>
                <Link className="nav-link" to="register">
                  register
                </Link>
              </>
            )}
            {auth && (
              <Link className="nav-link" onClick={Logout}>
                logout
              </Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
