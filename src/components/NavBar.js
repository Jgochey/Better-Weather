/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav, Button, Image } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();
  const UserId = user.uid;

  return (
    <Navbar collapseOnSelect expand="lg" className="navbar">
      <Container style={{ gap: '10px' }}>
        <Link passHref href="/" className="navbar-brand">
          <Navbar.Brand>
            <Image className="nav-img" style={{ width: '6.5rem' }} src="/images/logo.ico" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link className="nav-link" href="/">
              Forecasts
            </Link>
            <Link className="nav-link" href={`/SavedLocations/${UserId}`}>
              Saved Locations
            </Link>
            <Link className="nav-link" href="/NewForecastLocation">
              New Forecast Location
            </Link>
          </Nav>

          <Button variant="danger" onClick={signOut}>
            Sign Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
