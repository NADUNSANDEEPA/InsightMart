import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavBar/NavBar";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBCardImage } from "mdb-react-ui-kit";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import CommonBG from '../../assets/common-bg.webp';
import { ProductCategoryService } from "../../services/ProductCategoryService";

const categories = {
    Electronics: ["Mobiles", "Laptops", "Accessories"],
    Clothing: ["Men", "Women", "Kids"],
};

const ProductList: React.FC = () => {
    const [categoryFilter, setCategoryFilter] = useState("");
    const [subCategoryFilter, setSubCategoryFilter] = useState("");

    const [productCategories, setProductCategories] = useState<any[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await ProductCategoryService.getAll("2");
                setProductCategories(res.data || []);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);
    return (
        <div>
            <div
                style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),
                    url('${CommonBG}')
                    `,
                    backgroundRepeat: "repeat",
                    backgroundSize: "35% 35%",
                    backgroundPosition: "top left",
                    minHeight: "400px"
                }}
            >
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
                            productCategories={productCategories}
                            onCategoryChange={setCategoryFilter}
                            onSubCategoryChange={setSubCategoryFilter}
                        />

                        <MDBCol md="9" className="bg-white border shadow p-4 h-100" style={{ borderRadius: '10px' }}>
                            <div>
                                <div>
                                    <h2 className="mb-3 text-uppercase text-center text-decoration-underline">Our Collection</h2>
                                </div>
                                <div className="pb-5 pt-4">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4>Product Suggestions</h4>
                                        <span className="badge bg-info text-dark" style={{ fontSize: '0.8rem' }}>
                                            AI Feature
                                        </span>
                                    </div>

                                    {/* Horizontal scroll container */}
                                    <div className="d-flex gap-3 overflow-auto" style={{ paddingBottom: '10px' }}>
                                        {/* Each suggestion card */}
                                        <MDBCard className="border flex-shrink-0" style={{ minWidth: '250px' }}>
                                            <MDBCardBody>
                                                <MDBCardTitle>🍎 Fresh Apples</MDBCardTitle>
                                                <p className="text-muted mb-2">Recommended for boosting energy and focus.</p>
                                                <p><strong>AI Suggestion:</strong> Based on your recent activity, apples are a great snack to keep you active while coding.</p>
                                            </MDBCardBody>
                                        </MDBCard>

                                        <MDBCard className="border flex-shrink-0" style={{ minWidth: '250px' }}>
                                            <MDBCardBody>
                                                <MDBCardTitle>☕ Coffee Beans</MDBCardTitle>
                                                <p className="text-muted mb-2">Perfect for late-night work sessions.</p>
                                                <p><strong>AI Suggestion:</strong> Many software engineers prefer coffee to maintain alertness during long hours.</p>
                                            </MDBCardBody>
                                        </MDBCard>

                                        <MDBCard className="border flex-shrink-0" style={{ minWidth: '250px' }}>
                                            <MDBCardBody>
                                                <MDBCardTitle>🥦 Organic Vegetables</MDBCardTitle>
                                                <p className="text-muted mb-2">Good for long-term brain and neural health.</p>
                                                <p><strong>AI Suggestion:</strong> Adding more greens can support memory and focus as you age.</p>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </div>
                                </div>

                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        </div>
    );
};

export default ProductList;
