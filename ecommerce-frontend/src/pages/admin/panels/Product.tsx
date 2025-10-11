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
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import { ProductCategoryService } from "../../../services/ProductCategoryService";
import { ProductService } from "../../../services/ProductService";
import type { Product } from "../../../interface/Product";
import type { ProductCategory } from "../../../interface/ProductCategory";
import PaginatedTable from "../../../components/Table/PaginatedTable";

const ProductPanel: React.FC = () => {
    const [formData, setFormData] = useState({
        productName: "",
        productDescription: "",
        currentPrice: "0",
        currentStock: "0",
        productCategory: "",
    });
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const rowsPerPage = 5;

    // Fetch Categories
    const fetchCategories = async () => {
        setLoadingCategories(true);
        try {
            const res = await ProductCategoryService.getAll();
            setCategories(res.data || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoadingCategories(false);
        }
    };

    // Fetch Products
    const fetchProducts = async () => {
        setLoadingProducts(true);
        try {
            const res = await ProductService.getAll();
            const productsWithId = (res.data || []).map((p: Product) => ({
                ...p,
                id: p.id || p.productCode, // Ensure id exists for table
                productCategory: p.productCategory || { subCategoryName: "-" },
            }));
            setProducts(productsWithId);
            setCurrentPage(1);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoadingProducts(false);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAdd = async () => {
        const categoryObj = categories.find(cat => cat.id === formData.productCategory);
        const payload: Product = {
            id: Math.floor(Math.random() * 1000000).toString(),
            productCode: Math.floor(Math.random() * 1000000).toString(),
            productName: formData.productName,
            productDescription: formData.productDescription,
            currentPrice: parseFloat(formData.currentPrice),
            currentStock: parseInt(formData.currentStock, 10),
            productCategory: categoryObj as ProductCategory,
        };

        try {
            await ProductService.create(payload);
            await Swal.fire({
                icon: "success",
                title: "Product Added",
                text: `${formData.productName} was successfully added!`,
                timer: 2000,
                showConfirmButton: false,
            });
            setFormData({
                productName: "",
                productDescription: "",
                currentPrice: "",
                currentStock: "",
                productCategory: "",
            });
            fetchProducts();
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Failed to Add Product",
                text: error.message || "Something went wrong",
            });
        }
    };

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                await ProductService.delete(id);
                Swal.fire("Deleted!", "Product has been deleted.", "success");
                fetchProducts();
            } catch (error: any) {
                Swal.fire("Error", error.message || "Failed to delete product.", "error");
            }
        }
    };

    const handleEdit = (product: Product) => {
        setFormData({
            productName: product.productName,
            productDescription: product.productDescription,
            currentPrice: (product.currentPrice === null) ? "" : product.currentPrice.toString(),
            currentStock: (product.currentStock === null) ? "" : product.currentStock.toString(),
            productCategory: product.productCategory.id,
        });

    };

    return (
        <div className="p-4">
            <MDBRow>
                {/* Left side - Table */}
                <MDBCol md="8">
                    <MDBCard className="border shadow-0 mb-4">
                        <MDBCardBody>
                            <MDBCardTitle>Product List</MDBCardTitle>
                            {loadingProducts ? (
                                <div className="text-center my-5">
                                    <MDBSpinner role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </MDBSpinner>
                                </div>
                            ) : (
                                <PaginatedTable
                                    columns={[
                                        { label: "Name", field: "productName" },
                                        { label: "Price ($)", field: "currentPrice" },
                                        { label: "Stock (Kg)", field: "currentStock" },
                                        { label: "Category", field: "productCategory.subCategoryName" },
                                    ]}
                                    data={products}
                                    currentPage={currentPage}
                                    rowsPerPage={rowsPerPage}
                                    onPageChange={setCurrentPage}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            )}
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>

                {/* Right side - Form */}
                <MDBCol md="4">
                    <MDBCard className="border shadow-0 mb-4">
                        <MDBCardBody>
                            <MDBCardTitle className="mb-4">Add Product</MDBCardTitle>

                            <label>Product Name</label>
                            <MDBInput
                                name="productName"
                                value={formData.productName}
                                onChange={handleChange}
                                className="mb-4"
                            />

                            <label>Description</label>
                            <textarea
                                rows={5}
                                name="productDescription"
                                value={formData.productDescription}
                                onChange={handleChange}
                                className="form-control mb-4"
                            />

                            <label>Current Price</label>
                            <MDBInput
                                name="currentPrice"
                                type="number"
                                value={formData.currentPrice}
                                onChange={handleChange}
                                className="mb-4"
                            />

                            <label>Current Stock</label>
                            <MDBInput
                                name="currentStock"
                                type="number"
                                value={formData.currentStock}
                                onChange={handleChange}
                                className="mb-4"
                            />

                            <label>Product Category</label>
                            {loadingCategories ? (
                                <div className="text-center my-3">
                                    <MDBSpinner size="sm" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </MDBSpinner>
                                </div>
                            ) : (
                                <select
                                    className="form-select mb-3"
                                    name="productCategory"
                                    value={formData.productCategory}
                                    onChange={handleChange}
                                >
                                    <option value="">-- Select Category --</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.subCategoryName}
                                        </option>
                                    ))}
                                </select>
                            )}

                            <MDBBtn color="dark" className="shadow-0 w-100" onClick={handleAdd}>
                                Add Product
                            </MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </div>
    );
};

export default ProductPanel;
