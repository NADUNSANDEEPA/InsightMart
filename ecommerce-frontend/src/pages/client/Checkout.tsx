import React, { useState, useEffect } from "react";
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBBtn,
    MDBTypography,
    MDBInput,
    MDBRow,
    MDBCol
} from "mdb-react-ui-kit";
import Navbar from "../../components/NavBar/NavBar";
import CommonBG from '../../assets/common-bg.webp';
import Swal from "sweetalert2";
import { CartService } from "../../services/CartService";
import type { CheckOutRequest } from "../../interface/CheckOutRequest";

export default function Checkout() {
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
    const [addressLine1, setAddressLine1] = useState<string>("");
    const [addressLine2, setAddressLine2] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [province, setProvince] = useState<string>("");
    const [postalCode, setPostalCode] = useState<string>("");
    const [contactNumber, setContactNumber] = useState<string>("");
    const [contactName, setContactName] = useState<string>("");
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [cartId, setCartId] = useState("");
    const [loading, setLoading] = useState(true);

    const [cardNumber, setCardNumber] = useState<string>("");
    const [cardType, setCardType] = useState<string>("-");
    const [expiry, setExpiry] = useState<string>("");
    const [cvv, setCvv] = useState<string>("");

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
                const orders: any[] = response.data || [];
                if (orders.length > 0) {
                    setCartItems(orders[0].items);
                    setCartId(orders[0].id);
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
            const itemTotal = (item.unitPrice || 0) * item.quantity - (item.discount || 0) * item.quantity;
            return total + itemTotal;
        }, 0);
    };

    const detectCardType = (number: string) => {
        const trimmed = number.replace(/\s+/g, "");
        if (/^4[0-9]{0,}$/.test(trimmed)) return "Visa";
        if (/^5[1-5][0-9]{0,}$/.test(trimmed)) return "MasterCard";
        if (/^3[47][0-9]{0,}$/.test(trimmed)) return "American Express";
        if (/^6(?:011|5[0-9]{2})[0-9]{0,}$/.test(trimmed)) return "Discover";
        return "Unknown";
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ""); // remove non-digits
        setCardNumber(value);
        setCardType(detectCardType(value));
    };

    const handlePayNow = async () => {
        if (!addressLine1 || !city || !province || !contactNumber || !contactName || !cardNumber || !expiry || !cvv) {
            Swal.fire({
                icon: "error",
                title: "Missing Fields",
                text: "Please fill in all required fields!"
            });
            return;
        }

        if (cardNumber.length < 13 || cardNumber.length > 19) {
            Swal.fire({
                icon: "error",
                title: "Invalid Card",
                text: "Card number must be between 13 and 19 digits."
            });
            return;
        }


        // Prepare checkout data
        const checkoutData: CheckOutRequest = {
            cartId: cartId,
            addressLine1,
            addressLine2,
            city,
            province,
            postalCode,
            callingName: contactName,
            contactNumber,
            cardNumber,
            amount: getTotal(),
            paymentStatus: "PROCESSING",
        };

        try {
            setPaymentStatus("Processing payment...");
            setTimeout(async () => {
                await CartService.checkOutProcess(checkoutData);
                setPaymentStatus(`Payment successful! 🎉 Total Paid: LKR ${getTotal().toLocaleString()}`);
            }, 1500);
        } catch (error) {
            console.error("Checkout failed", error);
            setPaymentStatus("Payment failed. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <MDBTypography tag="h4">Loading checkout...</MDBTypography>
            </div>
        );
    }

    return (
        <div style={{
            backgroundImage: `linear-gradient(rgba(245, 245, 245, 0.9), rgba(245, 245, 245, 0.9)), url('${CommonBG}')`,
            backgroundRepeat: "repeat",
            backgroundSize: "35% 35%",
            backgroundPosition: "top left",
            minHeight: "100vh",
        }}>
            <MDBContainer fluid className="pt-2 px-5 pb-5" style={{ minHeight: "100vh" }}>
                <Navbar isBgColor={true} />
                <MDBCard className="mt-4"><MDBCardBody><h2 className="fw-bold">Proceed the Checkout..</h2></MDBCardBody></MDBCard>
                <MDBRow className="mt-4">
                    {/* Delivery Details */}
                    <MDBCol md="6">
                        <MDBCard className="mb-4 h-100">
                            <MDBCardBody>
                                <MDBTypography tag="h4" className="mb-3">Delivery Details</MDBTypography>
                                <MDBInput label="Address Line 1" type="text" value={addressLine1} onChange={e => setAddressLine1(e.target.value)} className="mb-3" />
                                <MDBInput label="Address Line 2" type="text" value={addressLine2} onChange={e => setAddressLine2(e.target.value)} className="mb-3" />
                                <MDBInput label="City" type="text" value={city} onChange={e => setCity(e.target.value)} className="mb-3" />
                                <MDBInput label="Province" type="text" value={province} onChange={e => setProvince(e.target.value)} className="mb-3" />
                                <MDBInput label="Postal Code" type="text" value={postalCode} onChange={e => setPostalCode(e.target.value)} className="mb-3" />
                                <MDBRow>
                                    <MDBCol>
                                        <MDBInput label="Calling Name" type="text" value={contactName} onChange={e => setContactName(e.target.value)} className="mb-3" />
                                    </MDBCol>
                                    <MDBCol>
                                        <MDBInput label="Contact Number" type="tel" value={contactNumber} onChange={e => setContactNumber(e.target.value)} className="mb-3" />
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    {/* Payment Section */}
                    <MDBCol md="6">
                        <MDBCard className="mb-4 h-100">
                            <MDBCardBody>
                                <MDBTypography tag="h4" className="mb-3">Payment</MDBTypography>
                                <div className="mb-5">
                                    <p><strong>Order Summary:</strong></p>
                                    <p>Total Items: {cartItems.length}</p>
                                    <p>Total Amount: LKR {getTotal().toLocaleString()}</p>
                                </div>
                                <hr />
                                <MDBTypography tag="h4" className="mb-3">Card Details</MDBTypography>
                                <MDBInput
                                    label={`Card Number (${cardType})`}
                                    type="text"
                                    placeholder="1234 5678 9012 3456"
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                    className="mb-3"
                                />
                                <MDBRow className="mb-3">
                                    <MDBCol>
                                        <MDBInput label="Expiry Date" type="text" placeholder="MM/YY" value={expiry} onChange={e => setExpiry(e.target.value)} />
                                    </MDBCol>
                                    <MDBCol>
                                        <MDBInput label="CVV" type="password" placeholder="123" value={cvv} onChange={e => setCvv(e.target.value)} />
                                    </MDBCol>
                                </MDBRow>

                                <MDBBtn color="dark" className="w-100 shadow-0" onClick={handlePayNow}>Pay Now</MDBBtn>
                                {paymentStatus && <p className="mt-3 text-success fw-bold text-center">{paymentStatus}</p>}
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}
