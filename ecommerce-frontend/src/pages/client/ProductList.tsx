import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavBar/NavBar";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBCardImage, MDBBadge, MDBIcon } from "mdb-react-ui-kit";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import CommonBG from '../../assets/common-bg.webp';
import { ProductCategoryService } from "../../services/ProductCategoryService";
import type { ProductCategory } from "../../interface/ProductCategory";
import { ProductService } from "../../services/ProductService";
import type { ProductPredictionResponse, Recommendation } from "../../interface/ProductPrediction";

const ProductList: React.FC = () => {
    const [categoryFilter, setCategoryFilter] = useState("");
    const [subCategoryFilter, setSubCategoryFilter] = useState("");

    const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [loading, setLoading] = useState<boolean>(false);


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
        fetchRecomendedProducts();
    }, []);

    const fetchRecomendedProducts = async () => {
        try {
            setLoading(true);
            const response: ProductPredictionResponse =
                await ProductService.productPrediction(
                    "CUST_001",
                    "30-40",
                    "BUDDHIST",
                    4,
                    "Ratnapura",
                    "Sabaragamuwa"
                );

            setRecommendations(response.data.recommendations);
            setLoading(false);

        } catch (error) {
            console.error("Failed to fetch recommended products", error);
        }
    };





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


                                    {loading ? (
                                        <div className="d-flex gap-3 overflow-auto">
                                            {[1, 2, 3].map((i) => (
                                                <MDBCard
                                                    key={i}
                                                    className="border flex-shrink-0"
                                                    style={{ minWidth: "260px" }}
                                                >
                                                    <MDBCardBody className="d-flex gap-3">
                                                        <div
                                                            style={{
                                                                width: "80px",
                                                                height: "80px",
                                                                backgroundColor: "#e0e0e0",
                                                                borderRadius: "8px"
                                                            }}
                                                        />
                                                        <div className="flex-grow-1">
                                                            <div className="placeholder-glow mb-2">
                                                                <span className="placeholder col-7"></span>
                                                            </div>
                                                            <div className="placeholder-glow mb-1">
                                                                <span className="placeholder col-5"></span>
                                                            </div>
                                                            <div className="placeholder-glow mb-1">
                                                                <span className="placeholder col-4"></span>
                                                            </div>
                                                        </div>
                                                    </MDBCardBody>
                                                </MDBCard>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="d-flex gap-3 overflow-auto">
                                            {recommendations.map((item) => (
                                                <MDBCard
                                                    key={item.product_code}
                                                    className="border flex-shrink-0"
                                                    style={{ minWidth: "260px" }}
                                                >
                                                    <MDBCardBody className="d-flex align-items-start gap-3">

                                                        <img
                                                            src={item.imageUrl ?? "https://illustoon.com/photo/11955.png"}
                                                            alt={item.product_name}
                                                            style={{
                                                                width: "110px",
                                                                height: "110px",
                                                                objectFit: "cover",
                                                                borderRadius: "8px"
                                                            }}
                                                        />

                                                        <div>
                                                            <MDBCardTitle className="mb-1">
                                                                {item.product_name}
                                                            </MDBCardTitle>

                                                            <p className="text-muted mb-1">
                                                                Category: {item.product_category}
                                                            </p>

                                                            <p className="mb-2">
                                                                <strong>Price:</strong> Rs. {item.unit_price}
                                                            </p>

                                                            <div className="d-flex align-items-center gap-2">
                                                                {item.stock && item.stock.availableStockKg > 0 ? (
                                                                    <span className="badge bg-success">
                                                                        Stock Available
                                                                    </span>
                                                                ) : (
                                                                    <span className="badge bg-danger">
                                                                        Out of Stock
                                                                    </span>
                                                                )}
                                                            </div>

                                                        </div>

                                                    </MDBCardBody>
                                                </MDBCard>
                                            ))}

                                        </div>
                                    )}




                                </div>

                                <div className="mt-5">
                                    <div
                                        className="position-relative rounded-4 overflow-hidden border shadow-sm"
                                        style={{
                                            backgroundImage: `url('https://thisisgalway.ie/wp-content/uploads/2020/05/HOW-TO-CREATE-THE-PERFECT-SUMMER-BBQ-1.jpg')`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat'
                                        }}
                                    >
                                        <div
                                            className="position-absolute w-100 h-100"
                                            style={{
                                                backgroundColor: 'rgba(0, 0, 0, 0.5)'
                                            }}
                                        ></div>

                                        <div className="position-relative p-4 text-white">
                                            <h3 className="fw-bold mb-2">
                                                🎉 Call for Your Parties & Events
                                            </h3>

                                            <p className="mb-3">
                                                Make your celebration unforgettable with our <strong>premium-quality meat, fresh fish,
                                                    and party essentials</strong>. Perfect for birthdays, weddings, office parties,
                                                BBQ nights, and family gatherings.
                                            </p>

                                            <ul className="mb-3 ps-3">
                                                <li>🥩 Fresh chicken, beef, and mutton</li>
                                                <li>🐟 Daily-fresh fish & seafood</li>
                                                <li>🍗 Party packs & bulk orders</li>
                                                <li>❄️ Hygienically processed & safely packed</li>
                                                <li>🚚 Reliable delivery & flexible quantities</li>
                                            </ul>

                                            <div className="d-flex align-items-center gap-3">
                                                <span className="fw-bold text-warning fs-5">
                                                    📞 011 338 2928
                                                </span>

                                                <span className="badge bg-success px-3 py-2">
                                                    Call Now to Pre-Order
                                                </span>
                                            </div>

                                            <p className="mt-2 mb-0" style={{ fontSize: "0.85rem", color: "#f0f0f0" }}>
                                                *Advance booking recommended for large orders & special events
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: '15%' }}>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4>Available Product Categories</h4>
                                    </div>
                                    <MDBRow className="g-4">
                                        {productCategories
                                            .filter((pc) => (categoryFilter ? pc.categoryName === categoryFilter : true))
                                            .filter((pc) => (subCategoryFilter ? pc.subCategoryName === subCategoryFilter : true))
                                            .map((pc, index) => (
                                                <MDBCol md="3" key={index}>
                                                    <MDBCard className="h-100 border">
                                                        <MDBCardImage
                                                            src={pc.imageUrl || 'https://via.placeholder.com/150'}
                                                            alt={pc.categoryName}
                                                            position="top"
                                                            style={{
                                                                height: '250px',
                                                                width: '100%',
                                                                objectFit: 'cover'
                                                            }}
                                                        />
                                                        <MDBCardBody>
                                                            <MDBRow className="mb-3">
                                                                <MDBCol>
                                                                    <h5 className="text-uppercase">{pc.subCategoryName}</h5>
                                                                </MDBCol>
                                                                <MDBCol>
                                                                    <MDBBadge color="secondary" className="float-end">
                                                                        {pc.categoryName}
                                                                    </MDBBadge>
                                                                </MDBCol>
                                                            </MDBRow>
                                                            <MDBBtn href={`/product/${pc.id}`} outline color="dark" className="w-100">
                                                                Shop Now
                                                                <MDBIcon fas icon="arrow-right" className="ms-2" />
                                                            </MDBBtn>
                                                        </MDBCardBody>
                                                    </MDBCard>
                                                </MDBCol>
                                            ))}
                                    </MDBRow>

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
