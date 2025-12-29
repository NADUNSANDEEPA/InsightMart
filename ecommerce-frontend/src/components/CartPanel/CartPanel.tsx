import React, { useState, useEffect } from "react";
import { MDBBtn, MDBCardImage, MDBIcon, MDBBadge } from "mdb-react-ui-kit";
import type { ProductStock } from "../../interface/ProductStock";
import { CartService } from "../../services/CartService";
import { CustomerService } from "../../services/CustomerService";
import Swal from "sweetalert2";
import type { Customer } from "../../interface/Customer";
import type { OrderRequest } from "../../interface/order/OrderRequest";

interface CartPanelProps {
    product: ProductStock | null;
    productCategoryName: string;
    isOpen: boolean;
    onClose: () => void;
}

const CartPanel: React.FC<CartPanelProps> = ({ product, productCategoryName, isOpen, onClose }) => {
    const [quantity, setQuantity] = useState(1);
    const [maxQuantity, setMaxQuantity] = useState(0);

    useEffect(() => {
        if (product) {
            setQuantity(1);
            setMaxQuantity(product.availableStockKg || 0);
        }
    }, [product]);

    if (!isOpen || !product) return null;

    const originalPrice = (product.pricePerKg || 0) * quantity;
    const discountAmount = (product.discount || 0) * quantity;
    const discountPrice = originalPrice - discountAmount;
    const hasDiscount = product.discount && product.discount > 0;

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value) || 0.1;
        const clampedValue = Math.min(Math.max(value, 0.1), maxQuantity);
        setQuantity(clampedValue);
    };

    async function productAddToCart(product: ProductStock, quantity: number) {
        const accessToken = localStorage.getItem("token");

        if (!accessToken) {
            Swal.fire("Error", "You must be logged in to add items to cart", "error");
            return;
        }

        let customerProfile: Customer;

        try {
            const decodedToken: any = JSON.parse(atob(accessToken.split(".")[1]));
            customerProfile = await CustomerService.customerByEmail(decodedToken.sub);
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to fetch customer details.", "error");
            return;
        }

        var discount = originalPrice - discountPrice;
        const orderPayload: OrderRequest = {
            customerId: customerProfile.data.email,
            customerAgeGroup: "",
            customerReligion: customerProfile.data.religion,
            city: customerProfile.data.city,
            province: customerProfile.data.province,
            paymentMethod: "CARD",
            orderStatus: "ACTIVE",
            deliveryType: "HOME_DELIVERY",
            deliveryStatus: "PENDING",
            items: [
                {
                    productCode: product.productCode,
                    productName: product.productName,
                    productCategory: productCategoryName,
                    quantity: quantity,
                    unitPrice: product.pricePerKg,
                    discount: hasDiscount ? (discount ?? 0) : 0,
                    rate: 0
                }
            ]
        };


        try {
            const response = await CartService.addItemsToCart(orderPayload);

            if (response.success) {
                Swal.fire("Success", "Item added to cart", "success");
                onClose();
            } else {
                Swal.fire("Error", response.message || "Failed to add item", "error");
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Something went wrong", "error");
        }
    }


    return (
        <>
            <div
                onClick={onClose}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    zIndex: 999,
                    overflowX: "auto",
                    overflowY: "hidden",
                    whiteSpace: "nowrap"
                }}
            />

            <div
                style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    width: "350px",
                    minWidth: "350px",
                    height: "100vh",
                    backgroundColor: "#fff",
                    boxShadow: "-2px 0 8px rgba(0,0,0,0.2)",
                    display: "flex",
                    flexDirection: "column",
                    zIndex: 1000,
                }}
            >
                <div className="p-3 border-bottom">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className="text-uppercase mb-0">Add To Cart</h4>
                        <MDBBtn color="danger" outline size="sm" onClick={onClose}>
                            <MDBIcon fas icon="times" />
                        </MDBBtn>
                    </div>
                </div>

                <div
                    className="flex-grow-1 p-3 overflow-auto"
                    style={{
                        flex: "1 1 auto",
                        overflowY: "auto",
                        overflowX: "hidden",
                        WebkitOverflowScrolling: "touch"
                    }}
                >
                    <h5 className="mb-3">{product.productName}</h5>
                    <MDBCardImage
                        src={product.imageUrl || "https://via.placeholder.com/150"}
                        alt={product.productName}
                        position="top"
                        style={{ height: "250px", width: "100%", objectFit: "cover", borderRadius: "10px" }}
                    />

                    <div className="mt-4">
                        <div className="mb-2"><strong>Price:</strong> LKR {product.pricePerKg?.toLocaleString()}</div>
                        <div className="mb-2"><strong>Available Stock:</strong> {product.availableStockKg} Kg</div>
                        <div className="mb-2"><strong>Discount:</strong> LKR {product.discount?.toLocaleString()} per Kg</div>
                        <div className="mb-2"><strong>Eligible Weight for Discount:</strong> {product.discountEligibleWeight} Kg</div>
                        <div className="mb-0">
                            <strong>Status:</strong>{" "}
                            <MDBBadge color={product.stockStatus === "ACTIVE" ? "success" : "warning"}>
                                {product.stockStatus === "ACTIVE" ? "Stock Available" : "Out Of Stock"}
                            </MDBBadge>
                        </div>
                    </div>
                </div>

                <div
                    className="p-3 border-top bg-light"
                    style={{
                        flexShrink: "0",
                        backgroundColor: "#f8f9fa"
                    }}
                >
                    <div className="mb-3">
                        <label className="form-label fw-bold">Quantity (Kg)</label>
                        <input
                            type="number"
                            min={0.1}
                            max={maxQuantity}
                            step="0.1"
                            value={quantity}
                            className="form-control"
                            onChange={handleQuantityChange}
                            disabled={product.availableStockKg <= 0}
                        />
                    </div>

                    <div className="mb-3">
                        {hasDiscount && (
                            <div className="text-end mb-2">
                                <p className="mb-1 text-muted text-decoration-line-through fs-6">
                                    Original: LKR {originalPrice.toFixed(2).toLocaleString()}
                                </p>
                                <p className="mb-0 text-success fs-4 fw-bold">
                                    Discount Price: LKR {discountPrice.toFixed(2).toLocaleString()}
                                </p>
                            </div>
                        )}
                        {!hasDiscount && (
                            <p className="mb-3 fw-bold text-end fs-5">
                                Total: LKR <span className="text-primary">{originalPrice.toFixed(2).toLocaleString()}</span>
                            </p>
                        )}
                    </div>

                    <MDBBtn
                        color="dark"
                        className="w-100 shadow-0"
                        size="lg"
                        onClick={() => productAddToCart(product, quantity)}
                        disabled={product.availableStockKg <= 0 || quantity < 0.1}
                    >
                        {product.availableStockKg > 0 ? "Confirm Add to Cart" : "Out of Stock"}
                    </MDBBtn>
                </div>
            </div>
        </>
    );
};

export default CartPanel;
