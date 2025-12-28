import React, { useState } from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
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

export default function Cart() {
    const [cartItems] = useState([
        {
            productCode: "CHICKEN001",
            productName: "Fresh Chicken",
            productCategory: "Meat",
            quantity: 1.5,
            unitPrice: 850,
            discount: 50,
            imageUrl: "https://via.placeholder.com/80?text=Chicken"
        },
        {
            productCode: "SALMON001",
            productName: "Salmon Fillets",
            productCategory: "Fish",
            quantity: 0.8,
            unitPrice: 1200,
            discount: 100,
            imageUrl: "https://via.placeholder.com/80?text=Salmon"
        }
    ]);

    const getTotal = () => {
        return cartItems.reduce((total, item) => {
            const itemTotal = (item.unitPrice || 0) * item.quantity - (item.discount || 0) * item.quantity;
            return total + itemTotal;
        }, 0);
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

                    <MDBRow className="mt-4">
                        <MDBCol>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 className="fw-bold">Shopping Cart</h2>
                                <div className="d-flex gap-2">
                                    <MDBBtn color="danger" size="sm">
                                        Clear Cart
                                    </MDBBtn>
                                    <MDBBadge color="primary" className="p-2">
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
                                        <MDBBtn color="primary">Continue Shopping</MDBBtn>
                                    </MDBCardBody>
                                </MDBCard>
                            ) : (
                                <>
                                    <MDBCard className="mb-4">
                                        <MDBCardBody>
                                            <MDBTable>
                                                <MDBTableHead>
                                                    <tr>
                                                        <th>Product</th>
                                                        <th>Price</th>
                                                        <th>Quantity</th>
                                                        <th>Total</th>
                                                        <th></th>
                                                    </tr>
                                                </MDBTableHead>
                                                <MDBTableBody>
                                                    {cartItems.map((item) => {
                                                        const itemTotal = ((item.unitPrice || 0) * item.quantity - (item.discount || 0) * item.quantity).toFixed(2);

                                                        return (
                                                            <tr key={item.productCode}>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <MDBCardImage
                                                                            src={item.imageUrl}
                                                                            style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px", marginRight: "15px" }}
                                                                        />
                                                                        <div>
                                                                            <div className="fw-bold">{item.productName}</div>
                                                                            <small className="text-muted">{item.productCategory}</small>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div>
                                                                        {item.discount && item.discount > 0 ? (
                                                                            <>
                                                                                <span className="text-decoration-line-through text-muted">LKR {(item.unitPrice || 0).toLocaleString()}</span><br />
                                                                                <strong className="text-success">LKR {((item.unitPrice || 0) - (item.discount || 0)).toLocaleString()}</strong>
                                                                            </>
                                                                        ) : (
                                                                            <strong>LKR {(item.unitPrice || 0).toLocaleString()}</strong>
                                                                        )}
                                                                        <br />
                                                                        <small className="text-muted">per Kg</small>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <MDBBtn size="sm" color="link">
                                                                            <MDBIcon icon="minus" />
                                                                        </MDBBtn>
                                                                        <MDBInput
                                                                            type="number"
                                                                            min={0.1}
                                                                            step="0.1"
                                                                            value={item.quantity}
                                                                            style={{ width: "80px", textAlign: "center" }}
                                                                        />
                                                                        <MDBBtn size="sm" color="link">
                                                                            <MDBIcon icon="plus" />
                                                                        </MDBBtn>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <strong>LKR {parseFloat(itemTotal).toLocaleString()}</strong>
                                                                </td>
                                                                <td>
                                                                    <MDBBtn color="link" size="sm">
                                                                        <MDBIcon icon="trash" />
                                                                    </MDBBtn>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </MDBTableBody>
                                            </MDBTable>
                                        </MDBCardBody>
                                    </MDBCard>

                                    <MDBCard>
                                        <MDBCardBody className="d-flex justify-content-between align-items-center flex-wrap">
                                            <div>
                                                <h5 className="mb-2">Order Summary</h5>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span>Subtotal ({cartItems.length} items):</span>
                                                    <strong>LKR {getTotal().toLocaleString()}</strong>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <span className="text-success">Savings:</span>
                                                    <strong>-LKR {cartItems.reduce((total, item) => total + ((item.discount || 0) * item.quantity), 0).toFixed(2).toLocaleString()}</strong>
                                                </div>
                                            </div>
                                            <div className="text-end">
                                                <MDBTypography tag="h4" className="mb-3">
                                                    Total: <span className="text-primary">LKR {getTotal().toLocaleString()}</span>
                                                </MDBTypography>
                                                <MDBBtn color="dark" size="lg" className="w-100">
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
        </div>
    );
}
