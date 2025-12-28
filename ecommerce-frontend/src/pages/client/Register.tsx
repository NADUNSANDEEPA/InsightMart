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
  MDBContainer
} from "mdb-react-ui-kit";
import NormalBtn from "../../components/Button/NormalBtn";
import bgImage from '../../assets/bg-img-reg.jpg';
import { AuthService } from "../../services/AuthService";
import type { Customer } from "../../interface/Customer";
import { CustomerService } from "../../services/CustomerService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Step 1 states
  const [fullName, setFullName] = useState("Nadun Sathsara");
  const [email, setEmail] = useState("sathsaran@gmail.com");
  const [telephone, setTelephone] = useState("0711044609");
  const [password, setPassword] = useState("Nadun1459@");
  const [confirmPassword, setConfirmPassword] = useState("Nadun1459@");

  // Step 2 states
  const [address, setAddress] = useState("Horana");
  const [province, setProvince] = useState("Western");
  const [city, setCity] = useState("Delgoda");
  const [familySize, setFamilySize] = useState("2");
  const [religion, setReligion] = useState("ISLAM");
  const [allergies, setAllergies] = useState("Yes");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validate Step 1
  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!telephone.trim()) {
      newErrors.telephone = "Telephone number is required.";
    } else if (!/^[0-9]{10}$/.test(telephone)) {
      newErrors.telephone = "Telephone must be 10 digits.";
    }
    if (!password) newErrors.password = "Password is required.";
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm your password.";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate Step 2
  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!address.trim()) newErrors.address = "Address is required.";
    if (!province.trim()) newErrors.province = "Province is required.";
    if (!city.trim()) newErrors.city = "City is required.";
    if (!familySize.trim()) newErrors.familySize = "Family size is required.";
    if (!religion.trim()) newErrors.religion = "Religion is required.";
    if (!allergies.trim()) newErrors.allergies = "Please mention allergies (or 'None').";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;

    const visitorToken = localStorage.getItem("token");
    if (!visitorToken) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Visitor token not found",
      });
      return;
    }

    try {
      const custRequest: Customer = {
        fullName,
        email,
        phone: telephone,
        password,
        address,
        city,
        province,
        customerType: "NORMAL",
        familySize: parseInt(familySize),
        isThereAllergic: allergies,
        religion,
        active: true,
      };

      const authResponse = await AuthService.authUserReg({
        username: email || "",
        password: password || "",
        role: "CUSTOMER",
      });

      if (!authResponse || !authResponse.success) {
        throw new Error("Authentication user registration failed");
      } else {
        const customerResponse = await CustomerService.create(custRequest);
        console.log("Customer registered successfully:", customerResponse);
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "Customer has been registered successfully.",
          confirmButtonColor: "#3085d6",
        });
        navigate("/login");
      }
    } catch (err: any) {
      console.error("Registration failed:", err);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text:
          err?.response?.data?.message ||
          "Something went wrong while registering the customer.",
        confirmButtonColor: "#d33",
      });
    }
  }

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,1)),  url(${bgImage})`,
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
          <MDBRow
            className="align-items-center"
            style={{ minHeight: "100%", paddingTop: "3%", marginTop: "10%" }}
          >
            <MDBCol md="6" lg="3"></MDBCol>
            <MDBCol md="6" lg="6">
              <MDBCard className="pt-4 shadow-sm">
                <MDBCardTitle className="text-center text-uppercase">
                  registration - step {step}
                </MDBCardTitle>
                <hr />
                <MDBCardBody>
                  <form onSubmit={handleRegister}>
                    {/* STEP 1 */}
                    {step === 1 && (
                      <>
                        <div className="mb-4">
                          <MDBInput
                            label="Full Name"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            style={{ fontSize: "14px" }}
                          />
                          {errors.fullName && (
                            <div className="text-danger" style={{ fontSize: "12px" }}>
                              {errors.fullName}
                            </div>
                          )}
                        </div>

                        <div className="mb-4">
                          <MDBInput
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ fontSize: "14px" }}
                          />
                          {errors.email && (
                            <div className="text-danger" style={{ fontSize: "12px" }}>
                              {errors.email}
                            </div>
                          )}
                        </div>

                        <div className="mb-4">
                          <MDBInput
                            label="Telephone Number"
                            type="tel"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                            style={{ fontSize: "14px" }}
                          />
                          {errors.telephone && (
                            <div className="text-danger" style={{ fontSize: "12px" }}>
                              {errors.telephone}
                            </div>
                          )}
                        </div>

                        <div className="mb-4">
                          <MDBInput
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ fontSize: "14px" }}
                          />
                          {errors.password && (
                            <div className="text-danger" style={{ fontSize: "12px" }}>
                              {errors.password}
                            </div>
                          )}
                        </div>

                        <div className="mb-4">
                          <MDBInput
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{ fontSize: "14px" }}
                          />
                          {errors.confirmPassword && (
                            <div className="text-danger" style={{ fontSize: "12px" }}>
                              {errors.confirmPassword}
                            </div>
                          )}
                        </div>

                        <div className="d-grid">
                          <NormalBtn
                            text="Next"
                            color="success"
                            backgroundColor="rgba(129, 7, 39, 1)"
                            borderColor="#B6C964"
                            borderSize="2px"
                            borderRadius="12px"
                            shadow="none"
                            padding="0.5rem 1.5rem"
                            size="lg"
                            icon="arrow-right"
                            type="button"
                            rounded
                            onClick={handleNext}
                          />
                        </div>
                      </>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                      <>
                        <div className="mb-4">
                          <MDBInput
                            label="Address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            style={{ fontSize: "14px" }}
                          />
                          {errors.address && (
                            <div className="text-danger" style={{ fontSize: "12px" }}>
                              {errors.address}
                            </div>
                          )}
                        </div>

                        <div className="mb-4">
                          <select
                            className="form-select"
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                          >
                            <option value="">Select Province</option>
                            <option value="Central">Central</option>
                            <option value="Western">Western</option>
                            <option value="Southern">Southern</option>
                            <option value="Northern">Northern</option>
                          </select>

                          {errors.province && (
                            <div className="text-danger" style={{ fontSize: "12px" }}>
                              {errors.province}
                            </div>
                          )}
                        </div>


                        <div className="mb-4">
                          <MDBInput
                            label="City"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            style={{ fontSize: "14px" }}
                          />
                          {errors.city && (
                            <div className="text-danger" style={{ fontSize: "12px" }}>
                              {errors.city}
                            </div>
                          )}
                        </div>

                        <div className="mb-4">
                          <MDBInput
                            label="Family Size"
                            type="number"
                            value={familySize}
                            onChange={(e) => setFamilySize(e.target.value)}
                            style={{ fontSize: "14px" }}
                          />
                          {errors.familySize && (
                            <div className="text-danger" style={{ fontSize: "12px" }}>
                              {errors.familySize}
                            </div>
                          )}
                        </div>

                        <div className="mb-4">
                          <label className="form-label">Religion</label>
                          <select
                            className="form-select"
                            value={religion}
                            onChange={(e) => setReligion(e.target.value)}
                            style={{ fontSize: "14px" }}
                          >
                            <option value="">Select Religion</option>
                            <option value="BUDDHIST">Buddhism</option>
                            <option value="HINDU">Hinduism</option>
                            <option value="ISLAM">Islam</option>
                            <option value="CHRISTIAN">Christianity</option>
                            <option value="OTHER">Other</option>
                          </select>

                          {errors.religion && (
                            <div className="text-danger" style={{ fontSize: "12px" }}>
                              {errors.religion}
                            </div>
                          )}
                        </div>


                        <div className="mb-4">
                          <label className="form-label">Do you have allergies?</label>
                          <select
                            className="form-select"
                            value={allergies}
                            onChange={(e) => setAllergies(e.target.value)}
                            style={{ fontSize: "14px" }}
                          >
                            <option value="">Do you have allergies?</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>

                          {errors.allergies && (
                            <div className="text-danger" style={{ fontSize: "12px" }}>
                              {errors.allergies}
                            </div>
                          )}
                        </div>


                        <div className="d-flex justify-content-between">
                          <NormalBtn
                            text="Back"
                            color="secondary"
                            outline
                            borderColor="rgba(255, 255, 255, 1)"
                            borderSize="2px"
                            borderRadius="12px"
                            textColor="rgba(98, 17, 40, 1)"
                            shadow="none"
                            padding="0.5rem 1.5rem"
                            size="lg"
                            icon="arrow-left"
                            type="button"
                            rounded
                            onClick={handleBack}
                          />

                          <NormalBtn
                            text="Register"
                            color="success"
                            backgroundColor="rgba(129, 7, 39, 1)"
                            borderColor="#B6C964"
                            borderSize="2px"
                            borderRadius="12px"
                            shadow="none"
                            padding="0.5rem 1.5rem"
                            size="lg"
                            icon="user"
                            type="submit"
                            rounded
                            outline={false}
                          />

                        </div>
                      </>
                    )}
                  </form>

                  <div className="text-center mt-3">
                    <a
                      href="./login"
                      style={{ fontSize: "11px", color: "#a8524aff" }}
                    >
                      I have an Account.
                    </a>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="6" lg="3"></MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <Footer />
    </div>
  );
};

export default Register;

