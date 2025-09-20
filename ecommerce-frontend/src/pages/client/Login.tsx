import React, { useState } from "react";
import Navbar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCol,
    MDBRow,
    MDBInput,
    MDBContainer,
} from "mdb-react-ui-kit";
import NormalBtn from "../../components/Button/NormalBtn";
import bgImage from '../../assets/bg-img-reg.jpg';

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Replace with real login logic
        console.log("Username:", username);
        console.log("Password:", password);
    };

    return (
        <div>
            <div
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,1)), url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    paddingBottom: "10%",
                }}
            >
                <MDBContainer
                    className="pt-2 pr-5 pl-5 pb-5"
                    style={{
                        minHeight: "100vh",
                    }}
                >
                    <Navbar
                        isBgColor={true}
                    />
                    <MDBRow className="align-items-center" style={{ minHeight: "100%", paddingTop: "3%", marginTop: '10%' }}>
                        <MDBCol md="6" lg="4"></MDBCol>
                        <MDBCol md="6" lg="4">
                            <MDBCard className="pt-4 shadow-sm">
                                <MDBCardTitle className="text-center text-uppercase">Login</MDBCardTitle>
                                <hr />
                                <MDBCardBody>
                                    <form onSubmit={handleLogin}>
                                        <MDBInput
                                            label="Username"
                                            type="text"
                                            className="mb-4"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                        <MDBInput
                                            label="Password"
                                            type="password"
                                            className="mb-4"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <div className="d-grid">
                                            <NormalBtn
                                                text="Login"
                                                color="success"
                                                backgroundColor="rgba(129, 7, 39, 1)"
                                                borderColor="#B6C964"
                                                borderSize="2px"
                                                borderRadius="12px"
                                                shadow="none"
                                                padding="0.5rem 1.5rem"
                                                size="lg"
                                                icon="user"
                                                onClick={() => console.log("Clicked!")}
                                                rounded
                                            />

                                        </div>
                                    </form>
                                    <div className="text-center">
                                        <a href="./register" style={{ fontSize: '11px', color: "#a8524aff" }}>I do not have a Account.</a>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol md="6" lg="4"></MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
