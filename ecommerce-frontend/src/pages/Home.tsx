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
import HomePageBg from "../assets/bg-img-reg.jpg";
import Navbar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import SectionTitle from "../components/Title/SectionTitle";

// Category images
import FreshMeat from '../assets/itemcategories/fresh-meat.jpg';
import FreshFish from '../assets/itemcategories/fresh-fish.jpg';
import ProcessedMeat from '../assets/itemcategories/processed-meat.jpg';
import Seafood from '../assets/itemcategories/seafood.jpg';
import Spices from '../assets/itemcategories/meat-spices.jpg';
import ProductCatalog from "../components/ProductCatelog/ProductCatalog";

type Product = {
  img: string;
  title: string;
  price: string;
  desc?: string;
};

const products: Product[] = [
  { img: "https://images.unsplash.com/photo-1604908177225-b4c3f7a2c72a", title: "Fresh Salmon", price: "Rs. 1,200 / 500g", desc: "Rich in Omega-3 fatty acids" },
  { img: "https://images.unsplash.com/photo-1506807803488-8eafc15316c9", title: "Chicken Thighs", price: "Rs. 800 / kg", desc: "Tender and juicy" },
  { img: "https://images.unsplash.com/photo-1572441710534-680f8e88a8c1", title: "Beef Mince", price: "Rs. 1,100 / kg", desc: "Premium quality beef" },
  { img: "https://images.unsplash.com/photo-1565958011703-44e6b63fe640", title: "Whole Prawns", price: "Rs. 1,500 / 500g", desc: "Fresh and succulent" },
  { img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90", title: "Chicken Sausages", price: "Rs. 950 / pack", desc: "Perfect for grilling" },
  { img: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba", title: "Tilapia Fish", price: "Rs. 900 / kg", desc: "Fresh farmed tilapia" },
  { img: "https://images.unsplash.com/photo-1572441711203-960c1e0c2b4c", title: "Pork Belly", price: "Rs. 1,400 / kg", desc: "Ideal for roasting" },
  { img: "https://images.unsplash.com/photo-1590080876582-dc28b74f0b2d", title: "Squid Rings", price: "Rs. 1,200 / 500g", desc: "Great for frying or BBQ" },
  { img: "https://images.unsplash.com/photo-1590080876301-52c01f7f8a77", title: "Lamb Chops", price: "Rs. 1,600 / kg", desc: "Juicy and flavorful" },
  { img: "https://images.unsplash.com/photo-1587202372775-98926bbd4c74", title: "Crab Meat", price: "Rs. 2,200 / 500g", desc: "Sweet and tender" },
];

// Utility to chunk products array for carousel slides
const chunkArray = <T,>(arr: T[], size: number): T[][] =>
  arr.reduce<T[][]>((acc, _, i) => (i % size === 0 ? [...acc, arr.slice(i, i + size)] : acc), []);

const productChunks = chunkArray(products, 5);

const Home: React.FC = () => {
  return (
    <div>
      <div style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,1)), url('${HomePageBg}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "20px"
      }}>
        <MDBContainer className="pt-2 pr-5 pl-5 pb-5" style={{ minHeight: "100vh" }}>
          <Navbar
            isBgColor={true}
          />
          <MDBRow className="align-items-center" style={{ minHeight: "100%", paddingTop: "15%" }}>
            <MDBCol size="12" md="7" className="mb-4 mb-md-0">
              <section >
                <div
                  className="badge p-2 rounded-6"
                  style={{
                    fontFamily: "'Roboto', sans-serif",
                    backgroundColor: "rgba(151, 29, 29, 0.4)",
                    color: "#d4ebd5ff",
                    fontSize: "13px",
                    fontWeight: "400",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <MDBIcon fas icon="truck" /> Fresh Fish & Meat Delivery
                </div>
                <h2 style={{ color: "white", lineHeight: 1.2 }}>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: "4.9rem" }}>Premium Fresh Fish & Meat,</span>
                  <br />
                  <hr style={{ width: '80%' }} />
                  <span style={{ fontWeight: 600, fontSize: "0.9rem", textTransform: 'uppercase', fontFamily: "'Roboto', sans-serif'", letterSpacing: '9px', color:'rgba(186, 186, 154, 1)' }}>Delivered To Your Doorstep</span>
                </h2>
              </section>
            </MDBCol>
            <MDBCol size="12" md="5" className="d-flex justify-content-center">
              <ProductCatalog />
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
                        <span style={{ fontWeight: 500, fontSize: "0.8rem", fontFamily: "'Roboto', sans-serif'" }}>{p.title}</span>
                        <br />
                        <span style={{ fontWeight: 400, fontSize: "0.8rem", fontFamily: "'Roboto', sans-serif'" }}>{p.price}</span>
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
            <img src={FreshMeat} alt="Fresh Meat" style={{ width: "100%", objectFit: "cover", display: "block", padding: 4 }} />
          </MDBCol>
          <MDBCol size={6}>
            <MDBRow className="g-0">
              <MDBCol size={6}>
                <img src={FreshFish} alt="Fresh Fish" style={{ width: "100%", objectFit: "cover", display: "block", padding: 4 }} />
                <img src={ProcessedMeat} alt="Processed Meat" style={{ width: "100%", objectFit: "cover", display: "block", padding: 4 }} />
              </MDBCol>
              <MDBCol size={6}>
                <MDBRow className="g-0">
                  {[Seafood, Spices].map((src, idx) => (
                    <MDBCol size={12} key={idx}>
                      <img src={src} alt={`Category small ${idx + 1}`} style={{ width: "100%", objectFit: "cover", display: "block", padding: 4 }} />
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
