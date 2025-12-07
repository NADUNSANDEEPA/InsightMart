import React, { useEffect, useState } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBSpinner,
} from "mdb-react-ui-kit";
import SalesChart from "./chat_box/SalesChart";

interface DashboardData {
    totalCustomers: number;
    totalFishCategories: number;
    totalMeatCategories: number;
    totalRevenueToday: number;
    categorySalesToday: {
        category: string;
        sales: number;
    }[];
}


const categories = ["Electronics", "Clothing", "Accessories", "Books"];
const todaySales = [150, 200, 80, 120];

const AdminDashboardWelcome: React.FC = () => {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate backend API delay
        setTimeout(() => {
            const sampleData: DashboardData = {
                totalCustomers: 1240,
                totalFishCategories: 12,
                totalMeatCategories: 9,
                totalRevenueToday: 58200,
                categorySalesToday: [
                    { category: "Fish", sales: 32000 },
                    { category: "Meat", sales: 18000 },
                    { category: "Seafood", sales: 8200 },
                ],
            };
            setDashboardData(sampleData);
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <div className="p-3" style={{
            backgroundColor: "rgba(239, 239, 239, 0.4)"
        }}>
            <MDBCardTitle className="text-center mb-4">
                <MDBIcon fas icon="chart-line" className="me-2 text-primary" />
                Admin Dashboard Overview
            </MDBCardTitle>

            {loading ? (
                <div className="text-center py-5">
                    <MDBSpinner grow className="text-primary me-2" />
                    <MDBSpinner grow className="text-success me-2" />
                    <MDBSpinner grow className="text-info" />
                    <p className="mt-3 text-muted">Loading dashboard data...</p>
                </div>
            ) : (
                <>
                    <MDBRow className="mb-4">
                        <MDBCol md="3">
                            <MDBCard
                                className="text-center shadow-none border border-primary border-2"
                            >
                                <MDBCardBody>
                                    <MDBIcon fas icon="users" size="2x" className="text-primary mb-2" />
                                    <MDBCardTitle>{dashboardData?.totalCustomers}</MDBCardTitle>
                                    <MDBCardText>Total Customer Base</MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>

                        <MDBCol md="3">
                            <MDBCard className="text-center shadow-none border border-success border-2">
                                <MDBCardBody>
                                    <MDBIcon fas icon="fish" size="2x" className="text-success mb-2" />
                                    <MDBCardTitle>{dashboardData?.totalFishCategories}</MDBCardTitle>
                                    <MDBCardText>Fish Categories</MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>

                        <MDBCol md="3">
                            <MDBCard className="text-center shadow-none border border-danger border-2">
                                <MDBCardBody>
                                    <MDBIcon fas icon="drumstick-bite" size="2x" className="text-danger mb-2" />
                                    <MDBCardTitle>{dashboardData?.totalMeatCategories}</MDBCardTitle>
                                    <MDBCardText>Meat Categories</MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>

                        <MDBCol md="3">
                            <MDBCard className="text-center shadow-none border border-warning border-2">
                                <MDBCardBody>
                                    <MDBIcon fas icon="dollar-sign" size="2x" className="text-warning mb-2" />
                                    <MDBCardTitle>Rs. {dashboardData?.totalRevenueToday.toLocaleString()}</MDBCardTitle>
                                    <MDBCardText>Total Revenue Today</MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>

                    <MDBCard className="shadow-none border border-dark">
                        <MDBCardBody>
                            <MDBCardTitle>
                                Today’s Category-wise Sales
                            </MDBCardTitle>
                            <SalesChart categories={categories} todaySales={todaySales} />
                        </MDBCardBody>
                    </MDBCard>
                </>
            )}
        </div>
    );
};

export default AdminDashboardWelcome;
