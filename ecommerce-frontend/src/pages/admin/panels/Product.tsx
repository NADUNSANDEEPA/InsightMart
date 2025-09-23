import React, { useEffect, useState } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCol,
    MDBRow,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBInput,
    MDBBtn,
} from "mdb-react-ui-kit";

interface ProductCategory {
    id: string;
    name: string;
}

const Product: React.FC = () => {
    const [formData, setFormData] = useState({
        productName: "",
        productDescription: "",
        currentPrice: "",
        currentStock: "",
        productCategory: "",
    });

    const [categories, setCategories] = useState<ProductCategory[]>([]);

    useEffect(() => {
        setCategories([
            { id: "1", name: "Fish" },
            { id: "2", name: "Meat" },
            { id: "3", name: "Vegetables" },
        ]);
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAdd = () => {
        const productPayload = {
            ...formData,
            currentPrice: parseFloat(formData.currentPrice),
            currentStock: parseFloat(formData.currentStock),
        };

        console.log("New Product:", productPayload);

        alert(`Product Added: ${formData.productName}`);
        setFormData({
            productName: "",
            productDescription: "",
            currentPrice: "",
            currentStock: "",
            productCategory: "",
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
                            <MDBTable hover responsive table-bordered border-primary>
                                <MDBTableHead style={{ backgroundColor: 'black' }}>
                                    <tr>
                                        <th className="text-white">Product</th>
                                        <th className="text-white">Price ($)</th>
                                        <th className="text-white">Stock Availability</th>
                                        <th className="text-white">Action</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>

                                </MDBTableBody>
                            </MDBTable>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>

                {/* Right side - Form */}
                <MDBCol md="4">
                    <MDBCard className="border shadow-0 mb-4">
                        <MDBCardBody>
                            <MDBCardTitle className="mb-4">Add Product</MDBCardTitle>

                            {/* Product Name */}
                            <label>Product Name</label>
                            <MDBInput
                                label=""
                                name="productName"
                                value={formData.productName}
                                onChange={handleChange}
                                className="mb-4"
                            />

                            {/* Description */}
                            <label className="form-label">Description</label>
                            <textarea rows={5} className="form-control mb-4"></textarea>

                            {/* Price */}
                            <label>Current Price</label>
                            <MDBInput
                                label=""
                                name="currentPrice"
                                type="number"
                                value={formData.currentPrice}
                                onChange={handleChange}
                                className="mb-4"
                            />

                            {/* Stock */}
                            <label>Current Stock</label>
                            <MDBInput
                                label=""
                                name="currentStock"
                                type="number"
                                value={formData.currentStock}
                                onChange={handleChange}
                                className="mb-4"
                            />

                            {/* Category */}
                            <label className="form-label">Product Category</label>
                            <select
                                className="form-select mb-3"
                                name="productCategory"
                                value={formData.productCategory}
                                onChange={handleChange}
                            >
                                <option value="">-- Select Category --</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>

                            {/* Submit */}
                            <MDBBtn
                                color="dark"
                                className="shadow-0 w-100"
                                onClick={handleAdd}
                            >
                                Add
                            </MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </div>
    );
};

export default Product;
