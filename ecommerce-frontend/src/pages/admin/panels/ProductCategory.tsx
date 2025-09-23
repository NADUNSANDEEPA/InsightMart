import React, { useState } from "react";
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

const ProductCategory: React.FC = () => {
  const [formData, setFormData] = useState({
    category: "",
    subCategory: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    console.log("Submitted Data:", formData);
    alert(`Category Added: ${formData.category} - ${formData.subCategory}`);
    setFormData({ category: "", subCategory: "", description: "" });
  };

  return (
    <div className="p-4">
      <MDBRow>
        {/* Left side - Table */}
        <MDBCol md="8">
          <MDBCard className="border shadow-0 mb-4">
            <MDBCardBody>
              <MDBCardTitle>Product Category List</MDBCardTitle>
              <MDBTable hover responsive table-bordered border-primary>
                <MDBTableHead style={{ backgroundColor: 'black' }}>
                  <tr>
                    <th className="text-white">Product Category</th>
                    <th className="text-white">Product Sub Category</th>
                    <th className="text-white">Actoin</th>
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
              <MDBCardTitle className="mb-4">Add Product Category</MDBCardTitle>

              {/* Category Dropdown */}
              <label className="form-label">Product Category</label>
              <select
                className="form-select mb-4"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">-- Select Category --</option>
                <option value="Fish">Fish</option>
                <option value="Meat">Meat</option>
              </select>

              {/* Subcategory */}
              <label className="form-label">Product Sub Category</label>
              <MDBInput
                label=""
                id="productSubCategory"
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                className="mb-4"
              />

              {/* Description */}
              <label className="form-label">Description</label>
              <textarea rows={5}  className="form-control mb-3"></textarea>

              {/* Submit Button */}
              <MDBBtn color="dark" className="shadow-0 w-100" onClick={handleAdd}>
                Add Category
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default ProductCategory;
