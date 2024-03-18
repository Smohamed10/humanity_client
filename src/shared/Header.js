import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { removeAuthUser, getAuthUser } from '../Helper/Storage';
import './ankh.css';

const Header = () => {

  const Auth=getAuthUser();
  const navigate = useNavigate();

    const Logout = () => { 
    removeAuthUser();
    navigate('/');
    }

    return (
      <div style={{backgroundColor:"black"}}>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" className="text-blue h2 mb-0">
            <strong style={{color:'whitesmoke'}}>Humanity</strong> 
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link style={{color:'whitesmoke'}} as={Link} to="/">Home</Nav.Link>
              <Nav.Link style={{color:'whitesmoke'}} as={Link} to="/about">About Us</Nav.Link>
              {!Auth && <Nav.Link style={{color:'whitesmoke'}} as={Link} to="/login">Login</Nav.Link>}
              {!Auth && <Nav.Link  style={{color:'whitesmoke'}}as={Link} to="/register">Register</Nav.Link>}
              {Auth && Auth[0].status==='user'&& <Nav.Link style={{color:'whitesmoke'}} as={Link} to="/submitform">Submit a Form</Nav.Link>}
              <Nav.Link style={{color:'whitesmoke'}} as={Link} to="/contact">Contact</Nav.Link>
              {Auth && Auth[0].status === 'admin' && <Nav.Link style={{color:'whitesmoke'}} as={Link} to="/post">Create Post</Nav.Link>}
              {Auth && Auth[0].status === 'admin' && <Nav.Link style={{color:'whitesmoke'}} as={Link} to="/manageusers">Manage Users</Nav.Link>}
              {Auth && Auth[0].status === 'admin' && <Nav.Link style={{color:'whitesmoke'}} as={Link} to="/manageforms">Manage Forms</Nav.Link>}
              {Auth && Auth[0].status === 'admin' && <Nav.Link style={{color:'whitesmoke'}} as={Link} to="/manageposts">Manage Posts</Nav.Link>}

            </Nav>
            <Nav>
              {Auth && <Nav.Link style={{color:'red'}} onClick={Logout} className='btn btn-sm btn-danger mx-2'>Logout</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;