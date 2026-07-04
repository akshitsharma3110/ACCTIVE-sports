'use client';

import { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default function NavbarComponent() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`acctive-navbar ${scrolled ? 'scrolled' : ''}`}
      id="navbar"
    >
      <Container>
        <Navbar.Brand href="#hero" className="d-flex align-items-center">
          <span className="nav-logo-text">ACCTIVE</span>
          <span className="nav-logo-badge">Sports</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="#hero">Home</Nav.Link>
            <Nav.Link href="#products">Catalogue</Nav.Link>
            <Nav.Link href="#features">Why Us</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
