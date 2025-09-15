import React, { useState } from "react";
import Navbar from "../../components/NavBar/NavBar";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from "mdb-react-ui-kit";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";

const categories = {
    Electronics: ["Mobiles", "Laptops", "Accessories"],
    Clothing: ["Men", "Women", "Kids"],
};

const ProductList: React.FC = () => {
    const [categoryFilter, setCategoryFilter] = useState("");
    const [subCategoryFilter, setSubCategoryFilter] = useState("");

    return (
        <div>
            <div style={{ backgroundColor: '#dedce0ff' }}>
                <MDBContainer
                    fluid
                    className="pt-2 px-5 pb-5"
                    style={{
                        minHeight: "100vh",
                    }}
                >
                    {/* Navbar */}
                    <Navbar isBgColor={true} />
                    <MDBRow className="mt-4">
                        <FilterSidebar
                            onCategoryChange={setCategoryFilter}
                            onSubCategoryChange={setSubCategoryFilter}
                        />

                        <MDBCol md="10">
                            
                        </MDBCol>
                    </MDBRow>

                </MDBContainer>
            </div>
        </div>
    );
};

export default ProductList;
