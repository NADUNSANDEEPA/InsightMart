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
import type { ProductCategory } from "../../interface/ProductCategory";
import type { Product } from "../../interface/Product";
import { ProductService } from "../../services/ProductService";

interface FilterSidebarProps {
  productCategories: ProductCategory[];
  onCategoryChange: (categoryId: string) => void;
  onSubCategoryChange: (subCategoryId: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  productCategories,
  onCategoryChange,
  onSubCategoryChange
}) => {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");

  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory("");
    onCategoryChange(categoryId);

    if (categoryId) {
      ProductService.getByCategory(categoryId)
        .then((products) => setProductsList(products || []))
        .catch((err) => console.error("Error fetching products:", err));
    } else {
      setProductsList([]);
    }
  };

  const handleSubCategorySelect = (product: Product) => {
    setSelectedSubCategory(product.productCode);
    onSubCategoryChange(product.productCode);
  };

  return (
    <MDBCol md="3" className="h-100">
      <MDBCard className="bg-white border pt-4 px-3">
        <h6 style={{ lineHeight: "0%", fontSize: "15px" }}>Filter Products</h6>
        <hr />

        {/* Category Dropdown */}
        <span style={{ fontSize: "13px", fontWeight: "500" }} className="mb-1">
          Category
        </span>
        <MDBDropdown className="mb-3">
          <MDBDropdownToggle
            color="light"
            className="w-100 ps-1"
            style={{ backgroundColor: "#D2D2D2", fontSize: "11px", textAlign: "left" }}
          >
            {selectedCategory
              ? productCategories.find(c => c.id === selectedCategory)?.subCategoryName
              : "Select Category"}
          </MDBDropdownToggle>
          <MDBDropdownMenu
            style={{ backgroundColor: "#D2D2D2", borderRadius: "2px", padding: "4px", cursor: "pointer" }}
          >
            {productCategories.map((cat) => (
              <MDBDropdownItem
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                style={{ fontSize: "13px" }}
              >
                {cat.subCategoryName}
              </MDBDropdownItem>
            ))}
          </MDBDropdownMenu>
        </MDBDropdown>

        {/* Subcategory Dropdown (always visible) */}
        <span style={{ fontSize: "13px", fontWeight: "500" }} className="mb-1">
          Subcategory
        </span>
        <MDBDropdown className="mb-3">
          <MDBDropdownToggle
            color="light"
            className="w-100 ps-1"
            style={{ backgroundColor: "#D2D2D2", fontSize: "11px", textAlign: "left" }}
          >
            {selectedSubCategory
              ? productsList.find(p => p.productCode === selectedSubCategory)?.productName
              : "Select Subcategory"}
          </MDBDropdownToggle>
          <MDBDropdownMenu
            style={{ backgroundColor: "#D2D2D2", borderRadius: "2px", padding: "4px", cursor: "pointer" }}
          >
            {productsList.length > 0 ? (
              productsList.map((product) => (
                <MDBDropdownItem
                  key={product.productCode}
                  onClick={() => handleSubCategorySelect(product)}
                  style={{ fontSize: "13px" }}
                >
                  {product.productName}
                </MDBDropdownItem>
              ))
            ) : (
              <MDBDropdownItem disabled style={{ fontSize: "13px", cursor: "not-allowed" }}>
                No products available
              </MDBDropdownItem>
            )}
          </MDBDropdownMenu>
        </MDBDropdown>

        {/* Search Button */}
        <div className="text-center pb-3">
          <NormalBtn
            color="dark"
            size="sm"
            style={{
              fontSize: "12px",
              padding: "6px 12px",
              boxShadow: 'none',
              width: '100%',
              cursor: selectedCategory ? 'pointer' : 'not-allowed',
              opacity: selectedCategory ? 1 : 0.5
            }}
            backgroundColor="rgba(73, 4, 4, 0.8)"
            icon="fas fa-magnifying-glass"
            text="Search"
            disabled={!selectedCategory}
          />
        </div>
      </MDBCard>
    </MDBCol>
  );
};

export default FilterSidebar;
