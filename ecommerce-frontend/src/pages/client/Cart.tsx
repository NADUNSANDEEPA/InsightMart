import React, { useEffect, useState } from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBTypography,
    MDBBtn,
    MDBIcon,
    MDBBadge,
    MDBInput,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
} from "mdb-react-ui-kit";
import Navbar from "../../components/NavBar/NavBar";
import CommonBG from '../../assets/common-bg.webp';
import { CartService } from "../../services/CartService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface CartItem {
    id: string;
    productCode: string;
    productName: string;
    productCategory: string;
    quantity: number;
    unitPrice: number;
    discount: number;
    rate: number;
    createdAt: string;
}

interface CartOrder {
    id: string;
    customerId: string;
    customerAgeGroup: string;
    customerReligion: string;
    city: string;
    province: string;
    items: CartItem[];
    paymentMethod: string;
    orderStatus: string;
    deliveryType: string;
    deliveryStatus: string;
    createdAt: string;
}

export default function Cart() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const accessToken = localStorage.getItem("token");

    useEffect(() => {
        if (!accessToken) {
            Swal.fire("Error", "You must be logged in to view your cart", "error");
            setLoading(false);
            return;
        }

        const fetchCart = async () => {
            const decodedToken: any = JSON.parse(atob(accessToken.split(".")[1]));
            try {
                const response = await CartService.getAllOrdersByType("2", decodedToken.sub);
                const orders: CartOrder[] = response.data || [];
                if (orders.length > 0) {
                    setCartItems(orders[0].items);
                } else {
                    setCartItems([]);
                }
            } catch (error) {
                console.error("Failed to load cart items", error);
                Swal.fire("Error", "Failed to load cart items", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [accessToken]);

    const getTotal = () => {
        return cartItems.reduce((total, item) => {
            const itemPrice = (item.unitPrice * item.quantity) - item.discount;
            return total + itemPrice;
        }, 0);
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <MDBIcon icon="spinner" spin size="3x" />
                <p>Loading cart...</p>
            </div>
        );
    }

    const productList = () => {
        navigate("/product-list"); 
    }
    
    const checkout = () => {
        navigate("/checkout"); 
    };

    return (
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

                <MDBRow className="mt-4">
                    <MDBCol>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="fw-bold">Shopping Cart</h2>
                            <div className="d-flex gap-2">
                                <MDBBtn color="danger" className="shadow-0" size="sm" onClick={() => setCartItems([])}>
                                    Clear Cart
                                </MDBBtn>
                                <MDBBadge color="primary" className="p-2 shadow-0">
                                    {cartItems.length} items
                                </MDBBadge>
                            </div>
                        </div>

                        {cartItems.length === 0 ? (
                            <MDBCard className="text-center py-5">
                                <MDBCardBody>
                                    <MDBIcon icon="shopping-cart" size="3x" className="text-muted mb-3" />
                                    <h4>Your cart is empty</h4>
                                    <p className="text-muted">Add some products to get started</p>
                                    <MDBBtn color="dark" onClick={productList}>Continue Shopping</MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        ) : (
                            <>
                                {/* Cart Table */}
                                <MDBCard className="mb-4">
                                    <MDBCardBody>
                                        <MDBTable>
                                            <MDBTableHead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Price</th>
                                                    <th>Quantity (Kg)</th>
                                                    <th></th>
                                                    <th>Total</th>
                                                    <th></th>
                                                </tr>
                                            </MDBTableHead>
                                            <MDBTableBody>
                                                {cartItems.map((item) => {
                                                    const itemTotal = ((item.unitPrice * item.quantity) - item.discount).toFixed(2);

                                                    return (
                                                        <tr key={item.id}>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <div>
                                                                        <div className="fw-bold">{item.productName}</div>
                                                                        <small className="text-muted">{item.productCategory}</small>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <strong>LKR {item.unitPrice.toLocaleString()}</strong>
                                                                <br />
                                                                <small className="text-muted">per Kg</small>
                                                            </td>
                                                            <td>
                                                                <MDBInput
                                                                    disabled={true}
                                                                    type="number"
                                                                    min={0.1}
                                                                    step="0.1"
                                                                    value={item.quantity}
                                                                    style={{ width: "80px", textAlign: "center" }}
                                                                />
                                                            </td>
                                                            <td></td>
                                                            <td>
                                                                {item.discount > 0 ? (
                                                                    <>
                                                                        <span className="text-decoration-line-through text-muted">
                                                                            LKR {(item.unitPrice * item.quantity).toLocaleString()}
                                                                        </span>
                                                                        <br />
                                                                        <strong className="text-success">
                                                                            LKR {(itemTotal).toLocaleString()}
                                                                        </strong>
                                                                    </>
                                                                ) : (
                                                                    <strong>LKR {((item.unitPrice * item.quantity)).toLocaleString()}</strong>
                                                                )}

                                                            </td>
                                                            <td>
                                                                <MDBBtn color="link" size="lg">
                                                                    <MDBIcon icon="trash" color="danger" />
                                                                </MDBBtn>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </MDBTableBody>
                                        </MDBTable>
                                    </MDBCardBody>
                                </MDBCard>

                                {/* Order Summary */}
                                <MDBCard>
                                    <MDBCardBody className="d-flex justify-content-between align-items-center flex-wrap">
                                        <div>
                                            <h5 className="mb-2">Order Summary</h5>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span>Subtotal ({cartItems.length} items) : </span>
                                                <strong>LKR {getTotal().toLocaleString()}</strong>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span className="text-success">Savings : </span>
                                                <strong>-LKR {cartItems.reduce((total, item) => total + item.discount, 0).toFixed(2).toLocaleString()}</strong>
                                            </div>
                                        </div>
                                        <div className="text-end">
                                            <MDBTypography tag="h4" className="mb-3">
                                                Total: <span className="text-primary">LKR {getTotal().toLocaleString()}</span>
                                            </MDBTypography>
                                            <MDBBtn color="dark" size="lg" className="w-100 shadow-0" onClick={checkout}>
                                                Proceed to Checkout <MDBIcon icon="arrow-right" className="ms-2" />
                                            </MDBBtn>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </>
                        )}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}
