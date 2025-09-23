import React, { useState } from "react";
import Navbar from "../../components/NavBar/NavBar";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBCardImage } from "mdb-react-ui-kit";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import CommonBG from '../../assets/common-bg.webp';

const categories = {
    Electronics: ["Mobiles", "Laptops", "Accessories"],
    Clothing: ["Men", "Women", "Kids"],
};

const ProductList: React.FC = () => {
    const [categoryFilter, setCategoryFilter] = useState("");
    const [subCategoryFilter, setSubCategoryFilter] = useState("");

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
                            onCategoryChange={setCategoryFilter}
                            onSubCategoryChange={setSubCategoryFilter}
                        />

                        <MDBCol md="9" className="bg-white border shadow p-4 h-100" style={{ borderRadius: '10px' }}>
                            <div className="pb-5">
                                <h4 className="mb-3">Product Suggestions</h4>
                                <div className="d-flex flex-column gap-3">
                                    <MDBCard className="border">
                                        <MDBCardBody>
                                            <MDBCardTitle>🍎 Fresh Apples</MDBCardTitle>
                                            <p className="text-muted mb-2">Recommended for boosting energy and focus.</p>
                                            <p><strong>AI Suggestion:</strong> Based on your recent activity, apples are a great snack to keep you active while coding.</p>
                                        </MDBCardBody>
                                    </MDBCard>

                                    <MDBCard className="border">
                                        <MDBCardBody>
                                            <MDBCardTitle>☕ Coffee Beans</MDBCardTitle>
                                            <p className="text-muted mb-2">Perfect for late-night work sessions.</p>
                                            <p><strong>AI Suggestion:</strong> Many software engineers prefer coffee to maintain alertness during long hours.</p>
                                        </MDBCardBody>
                                    </MDBCard>

                                    <MDBCard className="border">
                                        <MDBCardBody>
                                            <MDBCardTitle>🥦 Organic Vegetables</MDBCardTitle>
                                            <p className="text-muted mb-2">Good for long-term brain and neural health.</p>
                                            <p><strong>AI Suggestion:</strong> Adding more greens can support memory and focus as you age.</p>
                                        </MDBCardBody>
                                    </MDBCard>
                                </div>
                            </div>
                            <hr />
                            <div className="pt-5">
                                <h4 className="mb-3">Our Collection</h4>
                                <MDBRow className='row-cols-1 row-cols-md-4 g-4'>
                                    <MDBCol>
                                        <MDBCard>
                                            <MDBCardImage
                                                src='https://mdbootstrap.com/img/new/standard/city/041.webp'
                                                alt='...'
                                                position='top'
                                            />
                                            <MDBCardBody>
                                                <MDBCardTitle>Card title</MDBCardTitle>
                                                <MDBCardText>
                                                    This is a longer card with supporting text below as a natural lead-in to additional content.
                                                    This content is a little bit longer.
                                                </MDBCardText>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                    <MDBCol>
                                        <MDBCard>
                                            <MDBCardImage
                                                src='https://mdbootstrap.com/img/new/standard/city/042.webp'
                                                alt='...'
                                                position='top'
                                            />
                                            <MDBCardBody>
                                                <MDBCardTitle>Card title</MDBCardTitle>
                                                <MDBCardText>
                                                    This is a longer card with supporting text below as a natural lead-in to additional content.
                                                    This content is a little bit longer.
                                                </MDBCardText>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                    <MDBCol>
                                        <MDBCard>
                                            <MDBCardImage
                                                src='https://mdbootstrap.com/img/new/standard/city/043.webp'
                                                alt='...'
                                                position='top'
                                            />
                                            <MDBCardBody>
                                                <MDBCardTitle>Card title</MDBCardTitle>
                                                <MDBCardText>
                                                    This is a longer card with supporting text below as a natural lead-in to additional content.
                                                    This content is a little bit longer.
                                                </MDBCardText>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                    <MDBCol>
                                        <MDBCard>
                                            <MDBCardImage
                                                src='https://mdbootstrap.com/img/new/standard/city/044.webp'
                                                alt='...'
                                                position='top'
                                            />
                                            <MDBCardBody>
                                                <MDBCardTitle>Card title</MDBCardTitle>
                                                <MDBCardText>
                                                    This is a longer card with supporting text below as a natural lead-in to additional content.
                                                    This content is a little bit longer.
                                                </MDBCardText>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        </div>
    );
};

export default ProductList;
