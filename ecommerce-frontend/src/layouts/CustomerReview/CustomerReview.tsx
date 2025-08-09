import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdb-react-ui-kit";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  avatarUrl?: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Jane Doe",
    rating: 5,
    comment:
      "Great quality and fast delivery! I love shopping here for fresh produce.",
    avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 2,
    name: "John Smith",
    rating: 4,
    comment:
      "Good prices and friendly staff. The app makes ordering very easy.",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Mary Johnson",
    rating: 5,
    comment:
      "Excellent customer service and fresh groceries every time. Highly recommended!",
    avatarUrl: "https://randomuser.me/api/portraits/women/45.jpg",
  },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <MDBIcon
          key={i}
          fas
          icon={i < rating ? "star" : "star-half-alt"}
          style={{ color: "#FFC107" }}
        />
      ))}
    </>
  );
};

const CustomerReviewSection: React.FC = () => {
  return (
    <section
      style={{
        backgroundColor: "#f7f9f9",
        padding: "3rem 1rem",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <MDBContainer>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            fontWeight: "700",
            color: "#2F4F4F",
          }}
        >
          What Our Customers Say
        </h2>
        <MDBRow className="g-4 justify-content-center">
          {reviews.map(({ id, name, rating, comment, avatarUrl }) => (
            <MDBCol key={id} md="4" sm="6" xs="12">
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem", alignItems: "center" }}>
                  {avatarUrl && (
                    <img
                      src={avatarUrl}
                      alt={`${name} avatar`}
                      style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                    />
                  )}
                  <div>
                    <h5 style={{ margin: 0, color: "#2F4F4F" }}>{name}</h5>
                    <StarRating rating={rating} />
                  </div>
                </div>
                <p style={{ fontStyle: "italic", color: "#555" }}>"{comment}"</p>
              </div>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default CustomerReviewSection;
