import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBBtn,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import CommonBG from "../../assets/common-bg.webp";
import Footer from "../../components/AdminLayout/Footer/Footer";
import Navbar from "../../components/AdminLayout/NavBar/NavBar";
import Product from "./panels/Product";
import ProductCategoryPanel from "./panels/ProductCategoryPanel";
import UserPanel from "./panels/User";
import ChatBox from "./panels/chat_box/ChatBox";
import AdminDashboardWelcome from "./panels/AdminDashboardWelcome"

const menuItems = [
  { key: "overview", label: "Overview", icon: "tachometer-alt" },
  { key: "users", label: "Users", icon: "users" },
  { key: "product", label: "Product", icon: "box" },
  { key: "product-category", label: "Product Category", icon: "tags" },
  { key: "reports", label: "Reports", icon: "file-alt" },
  { key: "settings", label: "Settings", icon: "cog" },
];

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const chatBoxClose = () => {
    setChatOpen(!chatOpen);
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('${CommonBG}')`,
        backgroundRepeat: "repeat",
        backgroundSize: "35% 35%",
        backgroundPosition: "top left",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar */}
      <Navbar />

      <MDBContainer fluid className="flex-grow-1 py-4">
        <MDBRow>
          {/* Sidebar */}
          <MDBCol md={collapsed ? "1" : "2"} className="mb-4">
            <MDBCard className="shadow-sm h-100">
              <MDBCardBody className="p-2">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  {!collapsed && (
                    <MDBCardTitle className="mb-0">Admin Menu</MDBCardTitle>
                  )}
                  <MDBBtn
                    size="sm"
                    color="light"
                    className="shadow-0"
                    onClick={() => setCollapsed(!collapsed)}
                  >
                    <MDBIcon
                      fas
                      icon={collapsed ? "angle-double-right" : "angle-double-left"}
                    />
                  </MDBBtn>
                </div>

                <MDBListGroup light small>
                  {menuItems.map((item) => (
                    <MDBListGroupItem
                      key={item.key}
                      active={activeSection === item.key}
                      onClick={() => setActiveSection(item.key)}
                      action
                      className="d-flex align-items-center"
                    >
                      <MDBIcon fas icon={item.icon} className="me-2" />
                      {!collapsed && item.label}
                    </MDBListGroupItem>
                  ))}
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          {/* Content Area */}
          <MDBCol md={collapsed ? "11" : "10"}>
            <MDBCard className="shadow-sm h-100">
              <MDBCardBody>
                {activeSection === "overview" && (
                  <>
                    <AdminDashboardWelcome />
                  </>
                )}
                {activeSection === "users" && <UserPanel />}
                {activeSection === "product-category" && <ProductCategoryPanel />}
                {activeSection === "product" && <Product />}
                {activeSection === "reports" && (
                  <>
                    <MDBCardTitle>Reports</MDBCardTitle>
                    <p>Generate and download reports here.</p>
                  </>
                )}
                {activeSection === "settings" && (
                  <>
                    <MDBCardTitle>Settings</MDBCardTitle>
                    <p>Configure application settings.</p>
                  </>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      {/* Footer */}
      <Footer />

      {/* Chat Button */}
      <div style={{ position: "fixed", right: 20, bottom: 80, zIndex: 1050 }}>
        <MDBBtn
          color="primary"
          style={{
            borderRadius: "50%",
            width: "56px",
            height: "56px",
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setChatOpen(!chatOpen)}
          aria-label="Open chat"
        >
          <MDBIcon fas icon="comments" />
        </MDBBtn>
      </div>

      {/* Chat Box */}
      {chatOpen && (
        <ChatBox
          onClose={chatBoxClose}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
