import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavBar/NavBar";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBCardImage, MDBBadge, MDBIcon, MDBBreadcrumb, MDBBreadcrumbItem } from "mdb-react-ui-kit";
import CommonBG from '../../assets/common-bg.webp';
import { ProductCategoryService } from "../../services/ProductCategoryService";
import { ProductService } from "../../services/ProductService";
import type { ProductCategory } from "../../interface/ProductCategory";
import type { Product } from "../../interface/Product";
import CartPanel from "../../components/CartPanel/CartPanel";
import type { ProductStock } from "../../interface/ProductStock";

export default function Product() {
    const [products, setProducts] = useState<ProductStock[]>([]);
    const [productCategory, setProductCategory] = useState<ProductCategory | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [getProductCategoryId] = useState<string>(window.location.pathname.split("/").pop() || "");

    const [cartPanelOpen, setCartPanelOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductStock | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await ProductCategoryService.getById(getProductCategoryId);
            setProductCategory(res.data || null);
            if (res.data) {
                const prodRes = await ProductService.getProductForDisplayForCustomers(res.data.id);
                setProducts(prodRes || []);
            }
        } catch (err) {
            setError("Error fetching products.");
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCartClick = (product: ProductStock) => {
        setSelectedProduct(product);
        setCartPanelOpen(true);
    };

    const handleCloseCart = () => {
        setCartPanelOpen(false);
        setSelectedProduct(null);
    };

    return (
        <div>
            <div
                style={{
                    backgroundImage: `linear-gradient(rgba(245, 245, 245, 0.9), rgba(245, 245, 245, 0.9)), url('${CommonBG}')`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "35% 35%",
                    backgroundPosition: "top left",
                    minHeight: "100vh",
                }}
            >
                <MDBContainer fluid className="pt-2 px-5 pb-5" style={{ minHeight: "100vh" }}>
                    <Navbar isBgColor={true} />

                    {loading && (
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh", flexDirection: "column" }}>
                            <MDBIcon fas icon="spinner" spin size="3x" />
                            <p className="mt-3">Loading products...</p>
                        </div>
                    )}


                    {!loading && (
                        <>
                            <div className="mt-4 bg-white border" style={{ borderRadius: '5px' }}>
                                <MDBBreadcrumb className="my-2 mx-3">
                                    <MDBBreadcrumbItem href="/">Home</MDBBreadcrumbItem>
                                    <MDBBreadcrumbItem active>{productCategory?.categoryName || "Products"}</MDBBreadcrumbItem>
                                    <MDBBreadcrumbItem active>{productCategory?.subCategoryName || "Products Sub Category"}</MDBBreadcrumbItem>
                                </MDBBreadcrumb>
                            </div>

                            <div className="mt-3 mb-5">
                                {products.length === 0 ? (
                                    <p className="text-center text-muted" style={{ fontSize: "18px", marginTop: "50px" }}>
                                        No products available in this category.
                                    </p>
                                ) : (
                                    <MDBRow className="g-4">
                                        {products.map((product) => (
                                            <MDBCol xs="12" md="3" key={product.stockId}>
                                                <MDBCard className="bg-light bg-gradient border shadow-none h-100" style={{ borderRadius: '10px' }}>
                                                    <MDBCardBody className="p-3 d-flex flex-column">
                                                        {/* Product Image */}
                                                        <MDBCardImage
                                                            src={product.imageUrl || "https://via.placeholder.com/250"}
                                                            alt={product.productName}
                                                            position="top"
                                                            style={{ height: '250px', width: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                                        />
                                                        {/* Product Name */}
                                                        <MDBCardTitle className="pt-3 text-center text-uppercase" style={{ fontSize: "20px", fontWeight: "600" }}>
                                                            {product.productName}
                                                        </MDBCardTitle>
                                                        {/* Stock Details */}
                                                        <div className="mt-2 mb-5">
                                                            <p className="mb-1">
                                                                <strong>Price:</strong> LKR {(product.pricePerKg ?? 0).toLocaleString()}
                                                            </p>
                                                            <p className="mb-1">
                                                                <strong>Discount:</strong> LKR {(product.discount ?? 0).toLocaleString()} per Kg
                                                            </p>
                                                            <p className="mb-1"><strong>Available Stock:</strong> {product.availableStockKg} Kg</p>
                                                            <p className="mb-1"><strong>Eligible Weight for Discount:</strong> {product.discountEligibleWeight} Kg</p>
                                                            <p className="mb-1">
                                                                <strong>Status:</strong>{" "}
                                                                <span className={`badge ${product.stockStatus === "ACTIVE" ? "bg-success" : "bg-secondary"}`}>
                                                                    {product.stockStatus === "ACTIVE" ? "Stock Available" : "Out Of Stock"}
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <hr />
                                                        {/* Add to Cart */}
                                                        <div className="mt-auto d-flex justify-content-between align-items-center">
                                                            <span className="fw-normal" style={{ fontSize: "18px" }}>
                                                                LKR {(product.pricePerKg ?? 0).toLocaleString()}
                                                            </span>
                                                            <MDBBtn outline color="dark" onClick={() => handleAddToCartClick(product)}>
                                                                <MDBIcon fas icon="shopping-cart" className="me-2" />
                                                                Add to Cart
                                                            </MDBBtn>
                                                        </div>
                                                    </MDBCardBody>
                                                </MDBCard>
                                            </MDBCol>
                                        ))}
                                    </MDBRow>
                                )}
                            </div>

                        </>
                    )}

                    {/* Cart Panel */}
                    <CartPanel
                        product={selectedProduct}
                        productCategoryName={productCategory?.subCategoryName || ""}
                        isOpen={cartPanelOpen}
                        onClose={handleCloseCart}
                    />
                </MDBContainer>
            </div>
        </div>
    );
}
