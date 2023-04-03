import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button';
import './App.css';

function TopBar() {
  return (
    <Navbar bg="dark" variant='dark' expand="lg">
      <Container>
        <Navbar.Brand href="index.js">User database</Navbar.Brand>
        <Nav>
          <Navbar.Text className='mx-2'>Username</Navbar.Text>
          <Button variant='secondary'>Log out</Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default TopBar;