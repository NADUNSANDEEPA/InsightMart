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
import { CustomerService } from "../../../services/CustomerService";
import { ProductService } from "../../../services/ProductService";
import { ChartService } from "../../../services/ChartService";
import { ProductCategoryService } from "../../../services/ProductCategoryService";
import type { ProductCategory } from "../../../interface/ProductCategory";
import type { Product } from "../../../interface/Product";
import SalesAreaChart from "./chat_box/SalesAreaChart";
import type { DailySale } from "../../../interface/TimeBasedSales";

interface DashboardData {
    totalCustomers: number;
    totalFishCategories: number;
    totalMeatCategories: number;
    totalRevenueToday: number;
}

const AdminDashboardWelcome: React.FC = () => {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [religionChartData, setReligionChartData] = useState<any[]>([]);
    const [loadingReligionChart, setLoadingReligionChart] = useState(false);
    const [provinceChartData, setProvinceChartData] = useState<any[]>([]);
    const [loadingProvinceChart, setLoadingProvinceChart] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [productCategory, setProductCategory] = useState("");
    const [productCode, setProductCode] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [dailySales, setDailySales] = useState<DailySale[]>([]);
    const [startDate, setStartDate] = useState("2020-01-01");
    const [endDate, setEndDate] = useState("2025-12-30");


    useEffect(() => {
        const loadData = async () => {
            await fetchData();
            await loadDataForReligionBasedChart();
            await loadDataForProvinceBasedChart();
            await fetchCategories();
        };
        loadData();
    }, []);

    const fetchData = async () => {
        var customerCount = await CustomerService.getCustomerCount();
        var productCount = await ProductService.getProductCount();
        const analizedData: DashboardData = {
            totalCustomers: customerCount.data,
            totalFishCategories: productCount.data["fishProductCount"],
            totalMeatCategories: productCount.data["meatProductCount"],
            totalRevenueToday: 58200
        };
        setDashboardData(analizedData);
        setLoading(false);
    };

    const fetchCategories = async () => {
        setLoadingCategories(true);
        try {
            const res = await ProductCategoryService.getAll("2");
            setCategories(res.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingCategories(false);
        }
    };


    const handleProductCategoryChange = async (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const value = e.target.value;
        setProductCategory(value);
        setProductCode("");
        setProducts([]);

        if (!value) return;

        setLoadingProducts(true);
        try {
            const res = await ProductService.getByCategory(value);
            setProducts(res || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingProducts(false);
        }
    };

    const loadDataForProvinceBasedChart = async () => {
        console.log("Start | Call loadDataForProvinceBasedChart");
        setLoadingProvinceChart(true);
        try {
            const startDate = "2024-01-01";
            const endDate = "2024-01-31";

            const data = await ChartService.getSalesByProvince(startDate, endDate);
            setProvinceChartData(data);
            setLoadingProvinceChart(false);
            console.log(data);


        } catch (error) {
            console.error("Failed to load province-based chart data", error);
        }
    };

    const loadDataForReligionBasedChart = async () => {
        console.log("Start | Call loadDataForReligionBasedChart");
        try {
            setLoadingReligionChart(true);

            const data = await ChartService.getSalesByReligion(
                "2024-01-01",
                "2024-01-31"
            );

            setReligionChartData(data);
            console.log(data);

        } catch (error) {
            console.error("Failed to load religion-based sales data", error);
        } finally {
            setLoadingReligionChart(false);
        }
    };

    const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setProductCode(value);
    }

    const loadTimeBasedSales = async () => {
        try {
            setLoading(true);

            const result = await ChartService.getTimeBasedSales(
                startDate,
                endDate,
                productCode
            );
            console.log(result);


            setDailySales(result);
        } catch (error) {
            console.error("Failed to load time-based sales", error);
        } finally {
            setLoading(false);
        }
    };



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

                            <MDBRow className="mb-3">
                                {/* Start Date */}
                                <MDBCol md="3">
                                    <label>Start Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </MDBCol>

                                {/* End Date */}
                                <MDBCol md="3">
                                    <label>End Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </MDBCol>

                                {/* Category */}
                                <MDBCol md="3">
                                    <label>Category</label>
                                    {loadingCategories ? (
                                        <MDBSpinner size="sm" />
                                    ) : (
                                        <select
                                            className="form-select"
                                            value={productCategory}
                                            onChange={handleProductCategoryChange}
                                        >
                                            <option value="">-- Select --</option>
                                            {categories.map((c, index) => (
                                                <option key={`${c.id}-${index}`} value={c.id}>
                                                    {c.subCategoryName}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </MDBCol>

                                {/* Product */}
                                <MDBCol md="3">
                                    <label>Product</label>
                                    {loadingProducts ? (
                                        <MDBSpinner size="sm" />
                                    ) : (
                                        <select
                                            className="form-select"
                                            value={productCode}
                                            onChange={handleProductChange}
                                        >
                                            <option value="">-- Select --</option>
                                            {products.map((p, index) => (
                                                <option key={`${p.productCode}-${index}`} value={p.productName}>
                                                    {p.productName}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </MDBCol>
                            </MDBRow>


                            <MDBRow>
                                <MDBCol className="text-end">
                                    <button
                                        className="btn btn-dark shadow-none"
                                        onClick={loadTimeBasedSales}
                                        disabled={!startDate || !endDate}
                                    >
                                        Apply Filter
                                    </button>
                                </MDBCol>
                            </MDBRow>
                            <div className="mt-5">
                                <SalesAreaChart dailySales={dailySales} />
                            </div>
                        </MDBCardBody>

                    </MDBCard>
                </>
            )}
        </div>
    );
};

export default AdminDashboardWelcome;


