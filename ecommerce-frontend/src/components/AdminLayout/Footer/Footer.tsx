import React from "react";
import { MDBFooter, MDBContainer, MDBIcon } from "mdb-react-ui-kit";

const Footer: React.FC = () => {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-left shadow-sm mt-auto">
      <MDBContainer className="p-3 d-flex justify-content-between align-items-center">
        {/* Left side */}
        <span className="text-muted">© {new Date().getFullYear()} Admin Panel</span>

        {/* Right side social icons */}
        <div>
          <a href="https://facebook.com" className="me-3 text-reset">
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href="https://twitter.com" className="me-3 text-reset">
            <MDBIcon fab icon="twitter" />
          </a>
          <a href="https://linkedin.com" className="me-3 text-reset">
            <MDBIcon fab icon="linkedin-in" />
          </a>
        </div>
      </MDBContainer>
    </MDBFooter>
  );
};

export default Footer;
