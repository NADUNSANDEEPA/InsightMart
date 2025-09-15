import React from "react";

type SectionTitleProps = {
  children: React.ReactNode;
};

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", margin: "1.5rem 0" }}>
      <hr style={{ flex: 1, borderColor: "rgba(56, 102, 60)", marginRight: "1rem" }} />
      <h3
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 500,
          fontSize: "1.5rem",
          margin: 0,
          whiteSpace: "nowrap",
          color: "#6e0606ff",
        }}
      >
        {children}
      </h3>
      <hr style={{ flex: 1, borderColor: "#f1bc88ff", marginLeft: "1rem" }} />
    </div>
  );
};

export default SectionTitle;
