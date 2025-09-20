import React, { useState } from "react";
import { MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from "mdb-react-ui-kit";

const products = [
    // Fresh Meat - Chicken
    { mainCategory: "Fresh Meat", subCategory: "Chicken", isAvailable: true, todayPrice: 1500, name: "Whole Chicken" },
    { mainCategory: "Fresh Meat", subCategory: "Chicken", isAvailable: true, todayPrice: 800, name: "Chicken Breast" },
    { mainCategory: "Fresh Meat", subCategory: "Chicken", isAvailable: false, todayPrice: 650, name: "Chicken Thighs & Drumsticks" },
    { mainCategory: "Fresh Meat", subCategory: "Chicken", isAvailable: true, todayPrice: 700, name: "Chicken Mince" },
    { mainCategory: "Fresh Meat", subCategory: "Chicken", isAvailable: true, todayPrice: 2200, name: "Organic Chicken" },

    // Fresh Meat - Beef
    { mainCategory: "Fresh Meat", subCategory: "Beef", isAvailable: true, todayPrice: 1500, name: "Ground Beef" },
    { mainCategory: "Fresh Meat", subCategory: "Beef", isAvailable: true, todayPrice: 3500, name: "Beef Steaks (Ribeye)" },
    { mainCategory: "Fresh Meat", subCategory: "Beef", isAvailable: true, todayPrice: 3200, name: "Beef Roasts" },
    { mainCategory: "Fresh Meat", subCategory: "Beef", isAvailable: false, todayPrice: 2800, name: "Beef Ribs" },

    // Fresh Meat - Pork
    { mainCategory: "Fresh Meat", subCategory: "Pork", isAvailable: true, todayPrice: 2000, name: "Pork Chops" },
    { mainCategory: "Fresh Meat", subCategory: "Pork", isAvailable: true, todayPrice: 2200, name: "Pork Belly" },
    { mainCategory: "Fresh Meat", subCategory: "Pork", isAvailable: false, todayPrice: 2100, name: "Pork Ribs" },

    // Fresh Seafood - Fish
    { mainCategory: "Fresh Seafood", subCategory: "Fish", isAvailable: true, todayPrice: 6000, name: "Salmon Fillets" },
    { mainCategory: "Fresh Seafood", subCategory: "Fish", isAvailable: true, todayPrice: 2000, name: "Tuna" },
    { mainCategory: "Fresh Seafood", subCategory: "Fish", isAvailable: true, todayPrice: 900, name: "Tilapia" },

    // Fresh Seafood - Shellfish
    { mainCategory: "Fresh Seafood", subCategory: "Shellfish", isAvailable: true, todayPrice: 3500, name: "Shrimp & Prawns" },
    { mainCategory: "Fresh Seafood", subCategory: "Shellfish", isAvailable: false, todayPrice: 6000, name: "Crab" },
    { mainCategory: "Fresh Seafood", subCategory: "Shellfish", isAvailable: true, todayPrice: 15000, name: "Lobster" },

    // Marinated & Ready to Cook
    { mainCategory: "Marinated Meat", subCategory: "Chicken", isAvailable: true, todayPrice: 1800, name: "Marinated Chicken" },
    { mainCategory: "Marinated Meat", subCategory: "Fish", isAvailable: true, todayPrice: 2200, name: "Spiced Fish Fillets" },

    // Value Packs & Combos
    { mainCategory: "Value Packs", subCategory: "Family", isAvailable: true, todayPrice: 5000, name: "Family Pack Chicken" },
    { mainCategory: "Value Packs", subCategory: "BBQ", isAvailable: true, todayPrice: 7000, name: "BBQ Pack Beef" },
    { mainCategory: "Value Packs", subCategory: "Weekly Kit", isAvailable: true, todayPrice: 3500, name: "Weekly Meal Kit" }
];

const mainCategories = Array.from(new Set(products.map(p => p.mainCategory)));

const ProductCatalog: React.FC = () => {
    const [selectedMain, setSelectedMain] = useState("");
    const [selectedSub, setSelectedSub] = useState("");

    // Filter subcategories based on selected main category
    const subCategories = Array.from(
        new Set(
            products
                .filter(p => selectedMain ? p.mainCategory === selectedMain : true)
                .map(p => p.subCategory)
        )
    );

    // Filter products based on both selections
    const filteredProducts = products.filter(p => {
        return (!selectedMain || p.mainCategory === selectedMain) &&
            (!selectedSub || p.subCategory === selectedSub);
    });

    return (
        <MDBCol size="12" className="mt-4">
            <div
                style={{
                    background: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    padding: "20px",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
                }}
            >
                <h4 style={{ color: "#ffffff", textDecoration: "underline" }}>
                    Select Your Choices
                </h4>
                <div className="pt-3">
                    <div>
                        <label style={{ color: "#e0e0e0" }}>Main Category</label>
                        <select
                            className="form-select"
                            value={selectedMain}
                            onChange={e => { setSelectedMain(e.target.value); setSelectedSub(""); }}
                        >
                            <option value="">All Main Categories</option>
                            {mainCategories.map(main => (
                                <option key={main} value={main}>{main}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-3">
                        <label style={{ color: "#e0e0e0" }}>Sub Category</label>
                        <select
                            className="form-select"
                            value={selectedSub}
                            onChange={e => setSelectedSub(e.target.value)}
                            disabled={!selectedMain}
                        >
                            <option value="">All Subcategories</option>
                            {subCategories.map(sub => (
                                <option key={sub} value={sub}>{sub}</option>
                            ))}
                        </select>
                    </div>
                    <hr style={{ borderColor: "rgba(255,255,255,0.3)" }} />
                    <div>
                        <h6 style={{ color: "#dcdcdc" }}>Price:</h6>
                        <h6 style={{ color: "#dcdcdc" }}>Is Today Available:</h6>
                    </div>
                </div>
            </div>
        </MDBCol>
    );
};

export default ProductCatalog;
