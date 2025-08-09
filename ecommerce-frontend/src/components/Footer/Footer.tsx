import type { FC } from 'react';
import { useState } from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import Logo from '../../assets/logo.ico';


const footerLinkStyle: React.CSSProperties = {
    paddingTop: '5px',
    fontSize: '15px',
    color: '#E4F0E5',
    fontWeight: '300',
    textDecoration: 'none',
    transition: 'color 0.3s ease, text-decoration 0.3s ease'
};

const footerHoverStyle: React.CSSProperties = {
    color: '#B6C964',
    textDecoration: 'underline',
    cursor: 'pointer',
};

const AppFooter: FC = () => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    const renderLink = (item: string, index: number) => (
        <p key={item} style={{ marginBottom: '0px' }}>
            <a
                href="#"
                style={hoverIndex === index ? { ...footerLinkStyle, ...footerHoverStyle } : footerLinkStyle}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
            >
                {item}
            </a>
        </p>
    );

    const socialIcons: Array<'facebook-f' | 'twitter' | 'instagram' | 'linkedin' | 'youtube'> = [
        'facebook-f', 'twitter', 'instagram', 'linkedin', 'youtube'
    ];

    return (
        <MDBFooter style={{ background: "linear-gradient(135deg, #20292c, #426748)" }} className='text-center text-lg-start text-muted pt-4'>
            {/* Main Footer Content */}
            <section>
                <MDBContainer className='text-center text-md-start mt-5'>
                    <MDBRow className='mt-3'>

                        {/* Logo & About */}
                        <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                            <h6 className="fw-bold mb-4">
                                <img src={Logo} alt="Logo" style={{ height: "90px" }} />
                            </h6>
                            <p style={{ color: "#E4F0E5", fontSize: "14px", fontWeight: 300 }}>
                                Your trusted supermarket & delivery service bringing fresh groceries,
                                beverages, and essentials right to your doorstep.
                            </p>
                            <p style={{ color: "#E4F0E5", fontSize: "14px", fontWeight: 300, marginBottom: "4px" , marginTop:'25%' }}>
                                Jaykay Marketing Services Pvt Ltd.
                            </p>
                            <p style={{ color: "#E4F0E5", fontSize: "14px", fontWeight: 300, marginBottom: "4px"}}>
                                No:148, Peter Street, Colombo 2.
                            </p>
                            <p style={{ color: "#E4F0E5", fontSize: "14px", fontWeight: 900, marginBottom: "4px", marginTop:'10%'  }}>
                                <MDBIcon fas icon="phone" /> +94 11 2303500
                            </p>
                            <p style={{ color: "#E4F0E5", fontSize: "14px", fontWeight: 300 }}>
                                (Daily operating hours 8.00 a.m to 8.00 p.m)
                            </p>
                        </MDBCol>


                        {/* Quick Links */}
                        <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4' style={{ color: '#C6D586' }}>Quick Links</h6>
                            {["Home", "Catalogue & Deals", "Utility bill payments", "Track my order"].map((item, i) => renderLink(item, i))}
                        </MDBCol>

                        {/* Categories */}
                        <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4' style={{ color: '#C6D586' }}>Categories</h6>
                            {["Grocery", "Beverages", "Household", "Vegetables", "Fruits"].map((item, i) => renderLink(item, i + 4))}
                        </MDBCol>

                        {/* Useful Links */}
                        <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4' style={{ color: '#C6D586' }}>Useful Links</h6>
                            {["Privacy Notice", "FAQ", "Terms and Conditions", "Stores Delivery", "Grid"].map((item, i) => renderLink(item, i + 9))}
                        </MDBCol>

                    </MDBRow>
                </MDBContainer>
            </section>

            {/* Copyright */}
            <div className='text-center p-2'
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', fontWeight: '300', fontSize: '14px', color: '#E4F0E5' }}>
                © {new Date().getFullYear()} Keels. All rights reserved.
            </div>
        </MDBFooter>
    );
};

export default AppFooter;
