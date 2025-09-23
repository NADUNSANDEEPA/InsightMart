import React, { useState } from "react";
import {
  MDBCard,
  MDBCol,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdb-react-ui-kit";
import NormalBtn from "../Button/NormalBtn";

// Mock data for categories and subcategories
const categories = {
  Electronics: ["Mobiles", "Laptops", "Accessories"],
  Clothing: ["Men", "Women", "Kids"],
};

const FilterSidebar: React.FC<{
  onCategoryChange: (category: string) => void;
  onSubCategoryChange: (subCategory: string) => void;
}> = ({ onCategoryChange, onSubCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory("");
    onCategoryChange(category);
  };

  const handleSubCategorySelect = (sub: string) => {
    setSelectedSubCategory(sub);
    onSubCategoryChange(sub);
  };

  return (
    <MDBCol md="3" className="h-100">
      <MDBCard className="bg-white border pt-4 px-3">
        {/* Heading */}
        <h6 style={{ lineHeight: "0%", fontSize: "15px" }}>
          Filter Products
        </h6>
        <hr />

        {/* Category Dropdown */}
        <span style={{ fontSize: "13px", fontWeight: "500" }} className="mb-1">
          Category
        </span>
        <MDBDropdown className="mb-3">
          <MDBDropdownToggle
            color="light"
            className="w-100 ps-1"
            style={{
              backgroundColor: "#D2D2D2",
              fontSize: "11px",
              textAlign: "left",
            }}
          >
            {selectedCategory || "Select Category"}
          </MDBDropdownToggle>
          <MDBDropdownMenu
            style={{
              backgroundColor: "#D2D2D2",
              borderRadius: "2px",
              padding: "4px",
              cursor: "pointer",
            }}
          >
            {Object.keys(categories).map((category) => (
              <MDBDropdownItem
                key={category}
                onClick={() => handleCategorySelect(category)}
                style={{ fontSize: "13px" }}
              >
                {category}
              </MDBDropdownItem>
            ))}
          </MDBDropdownMenu>
        </MDBDropdown>

        {/* Subcategory Dropdown */}
        {selectedCategory && (
          <>
            <span
              style={{ fontSize: "13px", fontWeight: "500" }}
              className="mb-1"
            >
              Subcategory
            </span>
            <MDBDropdown className="mb-3">
              <MDBDropdownToggle
                color="light"
                className="w-100"
                style={{
                  backgroundColor: "#D2D2D2",
                  fontSize: "11px",
                  textAlign: "left",
                }}
              >
                {selectedSubCategory || "Select Subcategory"}
              </MDBDropdownToggle>
              <MDBDropdownMenu
                style={{
                  backgroundColor: "#D2D2D2",
                  borderRadius: "2px",
                  padding: "4px",
                  cursor: "pointer",
                }}
              >
                {categories[selectedCategory as keyof typeof categories].map(
                  (sub) => (
                    <MDBDropdownItem
                      key={sub}
                      onClick={() => handleSubCategorySelect(sub)}
                      style={{ fontSize: "13px" }}
                    >
                      {sub}
                    </MDBDropdownItem>
                  )
                )}
              </MDBDropdownMenu>
            </MDBDropdown>
          </>
        )}

        {/* Search Button */}
        <div className="text-center pb-3">
          <NormalBtn
            color="dark"
            size="sm"
            style={{ fontSize: "12px", padding: "6px 12px", boxShadow :'none', width:'100%'}}
            backgroundColor="#4904041e"
            icon="fas fa-magnifying-glass"
            text="Search" 
          />
        </div>
      </MDBCard>
    </MDBCol>
  );
};

export default FilterSidebar;
