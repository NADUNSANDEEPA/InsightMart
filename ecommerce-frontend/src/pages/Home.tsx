import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCarousel,
  MDBCarouselItem,
  MDBIcon,
} from "mdb-react-ui-kit";
import HomePageBg from "../assets/food-delivery-man.png";
import Navbar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import SectionTitle from "../components/Title/SectionTitle";

import Vegitable from '../assets/itemcategories/fresh-vegitable-and-fruites.jpg';
import HouseHoldItem from '../assets/itemcategories/house-hold-items.jpg';
import Meats from '../assets/itemcategories/meat-and-fish.jpg';
import Snacks from '../assets/itemcategories/snacks-confectionery.jpg';
import RiceGain from '../assets/itemcategories/rice-gain-and-flour.jpg';

type Product = {
  img: string;
  title: string;
  price: string;
  desc?: string;
};

const products: Product[] = [
  { img: "https://images.unsplash.com/photo-1604908177225-b4c3f7a2c72a", title: "Fresh Apples", price: "Rs. 550 / 1kg", desc: "Crisp and sweet red apples" },
  { img: "https://images.unsplash.com/photo-1506807803488-8eafc15316c9", title: "Whole Wheat Bread", price: "Rs. 220", desc: "Soft and healthy whole grain bread" },
  { img: "https://images.unsplash.com/photo-1572441710534-680f8e88a8c1", title: "Organic Bananas", price: "Rs. 320 / dozen", desc: "Naturally ripened bananas" },
  { img: "https://images.unsplash.com/photo-1565958011703-44e6b63fe640", title: "Cheddar Cheese", price: "Rs. 1,450", desc: "Rich and creamy aged cheddar" },
  { img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90", title: "Pasta Spaghetti", price: "Rs. 480", desc: "Italian durum wheat spaghetti" },
  { img: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba", title: "Orange Juice", price: "Rs. 750 / 1L", desc: "Freshly squeezed pure juice" },
  { img: "https://images.unsplash.com/photo-1572441711203-960c1e0c2b4c", title: "Tomatoes", price: "Rs. 250 / 500g", desc: "Vine-ripened fresh tomatoes" },
  { img: "https://images.unsplash.com/photo-1590080876582-dc28b74f0b2d", title: "Potato Chips", price: "Rs. 380", desc: "Crispy salted potato chips" },
  { img: "https://images.unsplash.com/photo-1590080876301-52c01f7f8a77", title: "Fresh Carrots", price: "Rs. 280 / 1kg", desc: "Organic crunchy carrots" },
  { img: "https://images.unsplash.com/photo-1587202372775-98926bbd4c74", title: "Strawberries", price: "Rs. 650 / 250g", desc: "Sweet and juicy strawberries" },
];

// Utility to chunk products array for carousel slides
const chunkArray = <T,>(arr: T[], size: number): T[][] =>
  arr.reduce<T[][]>((acc, _, i) => (i % size === 0 ? [...acc, arr.slice(i, i + size)] : acc), []);

const productChunks = chunkArray(products, 5);

const Home: React.FC = () => {
  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #20292c, #426748)" }}>
        <MDBContainer
          className="pt-2 pr-5 pl-5 pb-5"
          style={{
            minHeight: "100vh",
          }}
        >
          <Navbar />
          <MDBRow className="align-items-center" style={{ minHeight: "100%", paddingTop: "3%" }}>
            <MDBCol size="12" md="7" className="mb-4 mb-md-0">
              <section>
                <div
                  className="badge p-2 rounded-6"
                  style={{
                    fontFamily: "'Roboto', sans-serif",
                    backgroundColor: "#38663C",
                    color: "#d4ebd5ff",
                    fontSize: "13px",
                    fontWeight: "400",
                  }}
                >
                  <MDBIcon fas icon="truck" /> Super Market And Delivery Service
                </div>
                <h2 style={{ color: "white", lineHeight: 1.2 }}>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: "2.8rem" }}>Everything You Need,</span>
                  <br />
                  <span
                    style={{
                      fontWeight: 300,
                      fontSize: "1.8rem",
                      fontFamily: "'Roboto', sans-serif",
                    }}
                  >
                    Fresh and Affordable.
                  </span>
                </h2>
              </section>
              <section
                style={{
                  marginTop: "14%",
                  border: "1px solid rgba(49, 51, 38, 0.7)",
                  backgroundColor: "rgba(56, 102, 60, 0.2)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  borderRadius: "12px",
                  padding: "2rem",
                  color: "#E4F0E5",
                  maxWidth: "700px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <h4
                  style={{
                    color: "#C6D586",
                    fontWeight: 300,
                    fontSize: "1rem",
                    fontFamily: "'Roboto', sans-serif",
                    textAlign: "center",
                  }}
                >
                  Customer Review
                </h4>
                <MDBRow>
                  <MDBCol className="text-center">
                    <span style={{ fontSize: "1rem", color: "#B6C964" }}>⭐</span>
                    <span style={{ fontSize: "17px", color: "#d4d8c2ff" }}>4.5+</span>
                    <br />
                    <span
                      style={{
                        fontWeight: 300,
                        color: "#d4d8c2ff",
                        fontSize: "0.8rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      Happy Customer Reviews
                    </span>
                  </MDBCol>
                  <MDBCol className="text-center">
                    <span style={{ fontSize: "1rem", color: "#B6C964" }}>📝</span>
                    <span style={{ fontSize: "17px", color: "#d4d8c2ff" }}>1000+</span>
                    <br />
                    <span
                      style={{
                        fontWeight: 300,
                        color: "#d4d8c2ff",
                        fontSize: "0.8rem",
                        marginTop: "0.5rem",
                      }}
                    >
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
      <div className="container mt-5" style={{ paddingTop: '10%', paddingBottom: '15%' }}>
        <SectionTitle>Best Sellers</SectionTitle>
        <MDBCarousel showControls showIndicators interval={10000}>
          {productChunks.map((chunk, idx) => (
            <MDBCarouselItem key={idx} itemId={idx + 1}>
              <MDBRow className="g-3">
                {chunk.map((p, i) => (
                  <MDBCol key={i}>
                    <MDBCard className="border">
                      <MDBCardImage src={p.img} alt={p.title} position="top" />
                      <MDBCardBody>
                        <span
                          style={{
                            fontWeight: 500,
                            fontSize: "0.8rem",
                            fontFamily: "'Roboto', sans-serif",
                          }}
                        >
                          {p.title}
                        </span>
                        <br />
                        <span
                          style={{
                            fontWeight: 400,
                            fontSize: "0.8rem",
                            fontFamily: "'Roboto', sans-serif",
                          }}
                        >
                          {p.price}
                        </span>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                ))}
              </MDBRow>
            </MDBCarouselItem>
          ))}
        </MDBCarousel>
      </div>
      <div className="container mt-5" style={{ paddingBottom: "15%" }}>
        <SectionTitle>Shop By Category</SectionTitle>
        <MDBRow className="g-0">
          <MDBCol size={6}>
            <img
              src={RiceGain}
              alt="Rice Gain and Flour"
              style={{
                width: "100%",
                objectFit: "cover",
                display: "block",
                padding:4
              }}
            />
          </MDBCol>

          <MDBCol size={6}>
            <MDBRow className="g-0">
              <MDBCol size={6}>
                <img
                  src={Vegitable}
                  alt="Vegitable and Fruites"
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    display: "block",
                    padding:4
                  }}
                />
                <img
                  src={Meats}
                  alt="Fish and Meats"
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    display: "block",
                    padding:4
                  }}
                />
              </MDBCol>
              <MDBCol size={6}>
                <MDBRow className="g-0">
                  {[
                    Snacks,
                    HouseHoldItem
                  ].map((src, idx) => (
                    <MDBCol size={12} key={idx}>
                      <img
                        src={src}
                        alt={`Category small ${idx + 1}`}
                        style={{
                          width: "100%",
                          objectFit: "cover",
                          display: "block",
                          padding:4
                        }}
                      />
                    </MDBCol>
                  ))}
                </MDBRow>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>

      </div>
      <Footer />
    </div>
  );
};

export default Home;
