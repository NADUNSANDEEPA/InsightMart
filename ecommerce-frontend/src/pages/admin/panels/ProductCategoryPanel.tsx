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
  MDBIcon,
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import { ProductCategoryService } from "../../../services/ProductCategoryService";
import type { ProductCategory } from "../../../interface/ProductCategory";

const ProductCategoryPanel: React.FC = () => {
  const [formData, setFormData] = useState({
    category: "",
    subCategory: "",
    description: "",
  });
  const [categories, setCategories] = useState<ProductCategory[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchCategories = async () => {
    const res = await ProductCategoryService.getAll();
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    const payload: ProductCategory = {
      id: "",
      categoryName: formData.category,
      subCategoryName: formData.subCategory,
      description: formData.description,
    };

    try {
      const res = await ProductCategoryService.create(payload);
      console.log("✅ Category Added:", res);

      await Swal.fire({
        icon: "success",
        title: "Category Added",
        text: `${formData.category} - ${formData.subCategory} was successfully added!`,
        timer: 2000,
        showConfirmButton: false,
      });

      setFormData({ category: "", subCategory: "", description: "" });
      fetchCategories();
    } catch (error: any) {
      console.error("❌ Failed to add category:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Add Category",
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
        await ProductCategoryService.delete(id);
        Swal.fire("Deleted!", "Category has been deleted.", "success");
        const data = await ProductCategoryService.getAll();
        setCategories(data);
      } catch (error: any) {
        Swal.fire("Error", error.message || "Failed to delete category.", "error");
      }
    }
  };

  const handleEdit = (cat: ProductCategory) => {
    setFormData({
      category: cat.categoryName,
      subCategory: cat.subCategoryName,
      description: cat.description,
    });
  };

5199

  return (
    <div className="p-4">
      <MDBRow>
        {/* Left side - Table */}
        <MDBCol md="8">
          <MDBCard className="border shadow-0 mb-4">
            <MDBCardBody>
              <MDBCardTitle>Product Category List</MDBCardTitle>
              <MDBTable hover responsive table-bordered="true" border-primary="true">
                <MDBTableHead style={{ backgroundColor: "black" }}>
                  <tr>
                    <th className="text-white">Product Category</th>
                    <th className="text-white">Product Sub Category</th>
                    <th className="text-white">Action</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {categories.length === 0 && (
                    <tr>
                      <td colSpan={3} className="text-center">
                        No categories found.
                      </td>
                    </tr>
                  )}
                  {categories.map((cat, index) => (
                    <tr key={index}>
                      <td>{cat.categoryName}</td>
                      <td>{cat.subCategoryName}</td>
                      <td>
                        <MDBBtn
                          size="sm"
                          color="warning"
                          className="me-2"
                          outline
                          onClick={() => handleEdit(cat)}
                        >
                          <MDBIcon fas icon="edit" className="me-1" />
                        </MDBBtn>
                        <MDBBtn
                          size="sm"
                          color="danger"
                          outline
                          onClick={() => handleDelete(cat.id)}
                        >
                          <MDBIcon fas icon="trash" className="me-1" />
                        </MDBBtn>
                      </td>
                    </tr>
                  ))}
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
              <textarea
                rows={5}
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control mb-3"
              />

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

export default ProductCategoryPanel;
