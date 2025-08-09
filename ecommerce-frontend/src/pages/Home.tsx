import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import HomePageBg from '../assets/food-delivery-man.png';
import Navbar from "../components/NavBar/NavBar";

const Home: React.FC = () => {
  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #20292c, #426748)" }}>
        <MDBContainer
          className="pt-2 pr-5 pl-5 pb-5"
          style={{
            minHeight: "100vh"
          }}
        >
          <Navbar />
          <MDBRow className="align-items-center" style={{ minHeight: "100%", paddingTop: '3%' }}>
            <MDBCol
              size="12"
              md="7"
              className="mb-4 mb-md-0"
            >
              <section>
                <div className="badge p-2 rounded-6"
                  style={{
                    fontFamily: "'Roboto', sans-serif",
                    backgroundColor: '#38663C',
                    color: '#d4ebd5ff',
                    fontSize: '13px',
                    fontWeight: '400'
                  }}>
                  <MDBIcon fas icon="truck" /> Super Market And Delivery Serivce
                </div>
                <h2 style={{ color: 'white', fontFamily: "'Montserrat', sans-serif", lineHeight: 1.2 }}>
                  <span style={{ fontWeight: 900, fontSize: '2.8rem' }}>
                    Everything You Need,
                  </span>
                  <br />
                  <span style={{ fontWeight: 300, fontSize: '1.8rem', fontFamily: "'Roboto', sans-serif" }}>
                    Fresh and Affordable.
                  </span>
                </h2>
              </section>
              <section
                style={{
                  marginTop: '14%',
                  border: '1px solid rgba(49, 51, 38, 0.7)',
                  backgroundColor: 'rgba(56, 102, 60, 0.2)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  borderRadius: '12px',
                  padding: '2rem',
                  color: '#E4F0E5',
                  maxWidth: '700px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <h4 style={{ color: '#C6D586', fontWeight: 300, fontSize: '1rem', fontFamily: "'Roboto', sans-serif", textAlign: 'center' }}>Customer Review</h4>
                <MDBRow>
                  <MDBCol className="text-center">
                    <span style={{ fontSize: "1rem", color: "#B6C964" }}>⭐</span>
                    <span style={{ fontSize: '17px', color: "#d4d8c2ff" }}>4.5+</span><br />
                    <span style={{ fontWeight: 300, color: "#d4d8c2ff", fontSize: "0.8rem", marginTop: "0.5rem" }}>
                      Happy Customer Reviews
                    </span>
                  </MDBCol>
                  <MDBCol className="text-center">
                    <span style={{ fontSize: "1rem", color: "#B6C964" }}>📝</span>
                    <span style={{ fontSize: '17px', color: "#d4d8c2ff" }}>1000+</span><br />
                    <span style={{ fontWeight: 300, color: "#d4d8c2ff", fontSize: "0.8rem", marginTop: "0.5rem" }}>
                      Reviews and Counting
                    </span>
                  </MDBCol>
                </MDBRow>
              </section>
            </MDBCol>
            <MDBCol size="12" md="5" className="d-flex justify-content-center">
              <img
                src={HomePageBg}
                style={{
                  maxHeight: "90vh",
                  width: "100%",
                  maxWidth: "400px",
                  objectFit: "contain",
                }}
                alt="Food Delivery Man"
              />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <div>
        <h1>ss</h1>
      </div>
    </div>
  );
};

export default Home;
