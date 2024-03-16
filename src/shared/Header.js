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
      <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" className="text-black h2 mb-0">
            Mondy<span className="Ankh">&#9765;</span>Magic
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About Us</Nav.Link>
              {!Auth && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
              {!Auth && <Nav.Link as={Link} to="/register">Register</Nav.Link>}
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
              {Auth && Auth[0].status === 1 && <Nav.Link as={Link} to="/managetrips">Manage trips</Nav.Link>}
              {Auth && Auth[0].status === 1 && <Nav.Link as={Link} to="/managebookings">Manage Bookings</Nav.Link>}
            </Nav>
            <Nav>
              <Nav.Link href="https://www.facebook.com/mondy.rmadan?mibextid=LQQJ4d" className="pl-3 pr-3 text-black">
                <span className="icon-facebook"></span>
              </Nav.Link>
              <Nav.Link href="https://wa.me/+2001009445487" className="pl-3 pr-3 text-black">
                <span className="icon-whatsapp"></span>
              </Nav.Link>
              <Nav.Link href="https://www.instagram.com/mondyrmadan?igsh=MTdtOWwwcTJzcjY0eA==" className="pl-3 pr-3 text-black">
                <span className="icon-instagram"></span>
              </Nav.Link>
              {Auth && <Nav.Link onClick={Logout} className='btn btn-sm btn-danger mx-2'>Logout</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;