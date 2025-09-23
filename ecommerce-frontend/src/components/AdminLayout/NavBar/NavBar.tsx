import React from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBIcon,
  MDBBtn
} from "mdb-react-ui-kit";

const Navbar: React.FC = () => {
  return (
    <MDBNavbar expand="lg" light bgColor="light" className="shadow-sm">
      <MDBContainer fluid>
        {/* Brand / Logo */}
        <MDBNavbarBrand href="/">
          <MDBIcon fas icon="cogs" className="me-2 text-primary" />
          Admin Panel
        </MDBNavbarBrand>

        {/* Right side links */}
        <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
          <MDBNavbarItem>
            <MDBNavbarLink href="/dashboard">
              <MDBIcon fas icon="tachometer-alt" className="me-1" />
              Dashboard
            </MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink href="/profile">
              <MDBIcon fas icon="user-circle" className="me-1" />
              Profile
            </MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBBtn size="sm" color="danger" href="/logout" className="ms-2">
              <MDBIcon fas icon="sign-out-alt" className="me-1" />
              Logout
            </MDBBtn>
          </MDBNavbarItem>
        </MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Navbar;
