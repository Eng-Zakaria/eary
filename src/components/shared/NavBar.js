import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const NavBar = (props) => {
  //  console.log(props);
  return (
    <>
      <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Eary</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
        
            <>
              
                <Link className="nav-link" to="/manage-questions">
                  Manage Questions
                </Link>
            
              <Link className="nav-link" to="/history">
                History
              </Link>
              <Link className="nav-link" to="/logout">
                Logout
              </Link>
            </>
        
            <>
              <Link className="nav-link" to="/register">
                Register
              </Link>
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </>
        
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    
    </>
  )
}

export default NavBar
