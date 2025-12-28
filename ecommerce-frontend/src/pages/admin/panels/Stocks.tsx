import React, { useEffect, useState } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCol,
    MDBRow,
    MDBInput,
    MDBBtn,
    MDBSpinner,
    MDBIcon,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";

import { ProductService } from "../../../services/ProductService";
import { ProductCategoryService } from "../../../services/ProductCategoryService";
import { StockService } from "../../../services/StockService";

import type { Product } from "../../../interface/Product";
import type { ProductCategory } from "../../../interface/ProductCategory";
import type { Stock } from "../../../interface/Stock";

import { StockStatusType } from "../../../types/StockStatusType";
import PaginatedTable from "../../../components/Table/PaginatedTable";
import type { StockTableRow } from "../../../interface/StockTableRow";

const Stocks: React.FC = () => {
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [loadingProductsTbl, setLoadingProductsTbl] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(false);

    const [products, setProducts] = useState<Product[]>([]);
    const [productsTbl, setProductsTbl] = useState<StockTableRow[]>([]);
    const [categories, setCategories] = useState<ProductCategory[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 7;

    const [productCategory, setProductCategory] = useState("");
    const [productCode, setProductCode] = useState("");

    const [receivedStock, setReceivedStock] = useState<number | "">("");
    const [availableStock, setAvailableStock] = useState<number | "">("");
    const [pricePerKg, setPricePerKg] = useState<number | "">("");
    const [discount, setDiscount] = useState<number | "">("");
    const [discountEligibleWeight, setDiscountEligibleWeight] = useState<number | "">("");

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

    const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setProductCode(value);

        if (!value) return;

        StockService.getStockByProductCode(value)
            .then((res) => {
                console.log("Existing stock:", res);
            })
            .catch((err) => console.error(err));
    };

    const resetForm = () => {
        setProductCategory("");
        setProductCode("");
        setProducts([]);
        setReceivedStock("");
        setAvailableStock("");
        setPricePerKg("");
        setDiscount("");
        setDiscountEligibleWeight("");
    };

    const handleSubmit = async () => {

        if (
            !productCode ||
            receivedStock === "" ||
            availableStock === "" ||
            pricePerKg === "" ||
            discount === ""
        ) {
            Swal.fire("Error", "Please fill all required fields", "error");
            return;
        }

        const payload: Stock = {
            id: "STOCK_" + Date.now(),
            productCode,
            receivedStockKg: Number(receivedStock),
            availableStockKg: Number(availableStock),
            pricePerKg: Number(pricePerKg),
            discount: Number(discount),
            discountEligibleWeight: Number(discountEligibleWeight) || 0,
            createdAt: new Date().toISOString(),
            status: StockStatusType.ACTIVE,
        };

        try {
            const res = await StockService.addStock(payload);

            if (res?.success) {
                Swal.fire("Success", "Stock added successfully", "success");
                fetchProductsForTbl();
                resetForm();
            } else {
                const addPending = await Swal.fire({
                    icon: "warning",
                    title: "Failed to add stock",
                    text: res?.message || "Do you want to add this stock as Active Pending?",
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                });

                if (addPending.isConfirmed) {
                    payload.status = StockStatusType.PENDING_ACTIVE;
                    const pendingRes = await StockService.addStock(payload);
                    if (pendingRes?.success) {
                        Swal.fire("Success", "Stock added as Active Pending successfully", "success");
                        resetForm();
                        fetchProductsForTbl();
                    } else {
                        Swal.fire("Failed", pendingRes?.message || "Failed to add stock", "error");
                    }
                }
            }
        } catch (err) {
            Swal.fire("Error", "Server error", "error");
            console.error(err);
        }
    };


    const fetchProductsForTbl = async () => {
        setLoadingProductsTbl(true);
        try {
            const res = await StockService.getAllStocks();
            setProductsTbl(res);
        } catch (error) {
            console.error("Error fetching stocks:", error);
        } finally {
            setLoadingProductsTbl(false);
        }
    };




    useEffect(() => {
        fetchCategories();
        fetchProductsForTbl();
    }, []);


    const handleEdit = (row: StockTableRow) => { };
    const handleToggleActiveProduct = (row: Product) => { };


    return (
        <>
            <MDBCardTitle className="mb-3">Stock Management</MDBCardTitle>

            <MDBRow>
                {/* TABLE */}
                <MDBCol md="9">
                    <MDBCard className="border shadow-0">
                        <MDBCardBody>
                            {loadingProductsTbl ? (
                                <div className="text-center">
                                    <MDBSpinner />
                                </div>
                            ) : (
                                <MDBTable striped bordered hover responsive>
                                    <MDBTableHead>
                                        <tr style={{ backgroundColor: "black" }}>
                                            <th>#</th>
                                            <th className="text-white text-center">Product Name</th>
                                            <th className="text-white text-center">Received (Kg)</th>
                                            <th className="text-white text-center">Available (Kg)</th>
                                            <th className="text-white text-center">Price / Kg (LKR)</th>
                                            <th className="text-white text-center">Discount (LKR)</th>
                                            <th className="text-white text-center">Eligible Weight (Kg)</th>
                                            <th className="text-white text-center">Status</th>
                                            <th className="text-white text-center">Actions</th>
                                        </tr>
                                    </MDBTableHead>

                                    <MDBTableBody>
                                        {productsTbl.length === 0 ? (
                                            <tr>
                                                <td colSpan={9} className="text-center text-muted">
                                                    No stock records found
                                                </td>
                                            </tr>
                                        ) : (
                                            productsTbl.map((stock, index) => (
                                                <tr key={stock.stockId}>
                                                    <td>{index + 1}</td>
                                                    <td>{stock.productName}</td>
                                                    <td>{stock.receivedStockKg}</td>
                                                    <td>{stock.availableStockKg}</td>
                                                    <td>{stock.pricePerKg}</td>
                                                    <td>{stock.discount}</td>
                                                    <td>{stock.discountEligibleWeight}</td>
                                                    <td>
                                                        <span
                                                            className={`badge ${stock.status === "ACTIVE"
                                                                ? "bg-success"
                                                                : stock.status === "PENDING_ACTIVE"
                                                                    ? "bg-warning"
                                                                    : "bg-secondary"
                                                                }`}
                                                        >
                                                            {stock.status}
                                                        </span>
                                                    </td>
                                                    <td className="text-nowrap">
                                                        <MDBBtn
                                                            size="sm"
                                                            color="info"
                                                            className="me-1"
                                                            onClick={() => handleEdit(stock)}
                                                        >
                                                            Edit
                                                        </MDBBtn>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </MDBTableBody>
                                </MDBTable>

                            )}
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>

                {/* FORM */}
                <MDBCol md="3">
                    <MDBCard className="border shadow-0">
                        <MDBCardBody>
                            <div className="d-flex justify-content-between mb-3">
                                <MDBCardTitle>Add Stock</MDBCardTitle>
                                <MDBBtn outline size="sm" onClick={resetForm}>
                                    <MDBIcon fas icon="rotate-left" />
                                </MDBBtn>
                            </div>

                            <label>Category</label>
                            {loadingCategories ? (
                                <>
                                    <div>
                                        <MDBSpinner size="sm" />
                                    </div>
                                </>
                            ) : (
                                <select
                                    className="form-select mb-3"
                                    value={productCategory}
                                    onChange={handleProductCategoryChange}
                                >
                                    <option value="">-- Select --</option>
                                    {categories.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.subCategoryName}
                                        </option>
                                    ))}
                                </select>
                            )}

                            <label>Product</label>
                            {loadingProducts ? (
                                <>
                                    <div>
                                        <MDBSpinner size="sm" />
                                    </div>
                                </>
                            ) : (
                                <select
                                    className="form-select mb-3"
                                    value={productCode}
                                    onChange={handleProductChange}
                                >
                                    <option value="">-- Select --</option>
                                    {products.map((p) => (
                                        <option key={p.id} value={p.productCode}>
                                            {p.productName}
                                        </option>
                                    ))}
                                </select>
                            )}

                            <label>Received Stock (Kg)</label>
                            <MDBInput
                                label=""
                                type="number"
                                value={receivedStock}
                                className="mb-3"
                                onChange={(e) =>
                                    setReceivedStock(e.target.value === "" ? "" : +e.target.value)
                                }
                            />

                            <label>Available Stock (Kg)</label>
                            <MDBInput
                                label=""
                                type="number"
                                value={availableStock}
                                className="mb-3"
                                onChange={(e) =>
                                    setAvailableStock(
                                        e.target.value === "" ? "" : +e.target.value
                                    )
                                }
                            />

                            <label>Price per Kg (LKR)</label>
                            <MDBInput
                                label=""
                                type="number"
                                value={pricePerKg}
                                className="mb-3"
                                onChange={(e) =>
                                    setPricePerKg(e.target.value === "" ? "" : +e.target.value)
                                }
                            />

                            <label>Discount per Kg (LKR)</label>
                            <MDBInput
                                label=""
                                type="number"
                                value={discount}
                                className="mb-3"
                                onChange={(e) =>
                                    setDiscount(
                                        e.target.value === "" ? "" : +e.target.value
                                    )
                                }
                            />

                            <label>Discount Eligible Weight (Kg)</label>
                            <MDBInput
                                label=""
                                type="number"
                                value={discountEligibleWeight}
                                className="mb-3"
                                onChange={(e) =>
                                    setDiscountEligibleWeight(
                                        e.target.value === "" ? "" : +e.target.value
                                    )
                                }
                            />

                            <MDBBtn className="w-100" color="dark" onClick={handleSubmit}>
                                Save Stock
                            </MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </>
    );
};

export default Stocks;

