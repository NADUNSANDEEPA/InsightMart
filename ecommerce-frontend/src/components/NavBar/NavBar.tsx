import { useState, useEffect } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
} from "mdb-react-ui-kit";
import Logo from '../../assets/logo.ico';
import GlassEffectButton from "../Button/GlassEffectButton";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface NavbarProps {
  isBgColor?: boolean;
  bgColor?: string;
  bgGradient?: string;
  bgImage?: string;
  overlayColor?: string;
}

const linkStyle = {
  paddingTop: '30px',
  fontSize: '15px',
  color: '#E4F0E5',
  transition: 'color 0.3s ease',
  fontWeight: '300'
};

const hoverStyle = {
  color: '#B6C964',
  textDecoration: 'underline',
  cursor: 'pointer',
};

const navLinks = [
  { label: "Home", href: "../product-list" },
  { label: "About", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Category", href: "#" },
];

const Navbar = ({
  isBgColor,
  bgColor,
  bgGradient,
  bgImage,
  overlayColor,
}: NavbarProps) => {
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine background style
  let backgroundStyle = "transparent";
  if (isBgColor) {
    if (bgImage) {
      // Image with optional overlay
      backgroundStyle = overlayColor
        ? `linear-gradient(${overlayColor}, ${overlayColor}), url('${bgImage}')`
        : `url('${bgImage}')`;
    } else if (bgGradient) {
      backgroundStyle = bgGradient;
    } else if (bgColor) {
      backgroundStyle = bgColor;
    } else {
      backgroundStyle = "linear-gradient(135deg, #470b0bff, #000000ff)";
    }
  } else if (scrolled) {
    backgroundStyle = "#4904041e";
  }

  const storedUser = localStorage.getItem("token");
  const user = storedUser ? JSON.parse(atob(storedUser.split('.')[1])) : null;

  function logoutHandler() {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        Swal.fire(
          'Logged Out!',
          'You have been logged out successfully.',
          'success'
        ).then(() => {
          navigate('/login');
          window.location.reload();
        });
      }
    });
  }


  return (
    <MDBNavbar
      expand="lg"
      className="shadow-0"
      style={{
        top: 0,
        borderRadius: '15px',
        background: backgroundStyle,
        backgroundSize: bgImage ? "cover" : undefined,
        backgroundPosition: bgImage ? "center" : undefined,
        backgroundRepeat: bgImage ? "no-repeat" : undefined,
        transition: "background 0.3s ease",
      }}
    >
      <MDBContainer fluid className="align-items-center">
        {/* Left side: Logo */}
        <MDBNavbarBrand
          href="#"
          className="order-0"
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img src={Logo} alt="Logo" style={{ height: "100px" }} />
        </MDBNavbarBrand>

        {/* Center: Navbar toggler for mobile */}
        <MDBNavbarToggler
          aria-controls="navbarCollapse"
          aria-expanded={showNav}
          aria-label="Toggle navigation"
          onClick={() => setShowNav(!showNav)}
          className="order-2 order-lg-1 mx-auto"
        />

        {/* Center: Collapsible nav links */}
        <MDBCollapse navbar open={showNav} className="order-3 order-lg-1 w-100">
          <MDBNavbarNav className="mx-auto flex-column flex-lg-row gap-3 justify-content-center">
            {navLinks.map(({ label, href }) => (
              <MDBNavbarItem key={label}>
                <MDBNavbarLink
                  href={href}
                  style={linkStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.color = hoverStyle.color)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = linkStyle.color)}
                >
                  {label}
                </MDBNavbarLink>
              </MDBNavbarItem>
            ))}
          </MDBNavbarNav>
        </MDBCollapse>

        {/* Right side: Cart & My Account buttons */}
        <div className="d-flex gap-2 order-1 order-lg-2 pe-5" style={{ paddingTop: '20px' }}>
          <GlassEffectButton
            text="Cart"
            borderSize="0px"
            shadow="0 4px 10px rgba(50, 70, 56, 0.4)"
            borderRadius="8px"
            padding="0.8rem 1.5rem"
            icon="shopping-cart"
            onClick={() => navigate('/cart')}
          />

          {user && user.role !== "NEWVISITOR" ? (
            <GlassEffectButton
              text="Logout"
              borderSize="0px"
              shadow="0 4px 10px rgba(50, 70, 56, 0.4)"
              borderRadius="8px"
              padding="0.8rem 1.5rem"
              icon="user"
              onClick={logoutHandler}
            />
          ) : (
            <GlassEffectButton
              text="My Account"
              borderSize="0px"
              shadow="0 4px 10px rgba(50, 70, 56, 0.4)"
              borderRadius="8px"
              padding="0.8rem 1.5rem"
              icon="sign-in-alt"
              onClick={() => navigate('/login')}
            />
          )}

        </div>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Navbar;
