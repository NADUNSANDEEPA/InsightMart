import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import { ProductCategoryService } from "../../../services/ProductCategoryService";
import type { ProductCategory } from "../../../interface/ProductCategory";
import PaginatedTable from "../../../components/Table/PaginatedTable";

const ProductCategoryPanel: React.FC = () => {
  const [formData, setFormData] = useState({
    id: "",
    category: "",
    subCategory: "",
    description: "",
  });

  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const rowsPerPage = 7;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await ProductCategoryService.getAll();
      setCategories(res.data || []);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddOrEdit = async () => {
    if (!formData.category || !formData.subCategory) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in both category and sub-category.",
      });
      return;
    }

    const payload: ProductCategory = {
      id: formData.id || Math.floor(Math.random() * 1000000).toString(),
      categoryName: formData.category,
      subCategoryName: formData.subCategory,
      description: formData.description,
    };

    try {
      if (formData.id) {
        await ProductCategoryService.update(payload.id, payload);
        await Swal.fire({
          icon: "success",
          title: "Category Updated",
          text: `${payload.categoryName} - ${payload.subCategoryName} updated successfully!`,
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await ProductCategoryService.create(payload);
        await Swal.fire({
          icon: "success",
          title: "Category Added",
          text: `${payload.categoryName} - ${payload.subCategoryName} added successfully!`,
          timer: 2000,
          showConfirmButton: false,
        });
      }

      setFormData({ id: "", category: "", subCategory: "", description: "" });
      fetchCategories();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.message || "Something went wrong",
      });
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
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
        fetchCategories();
      } catch (error: any) {
        Swal.fire("Error", error.message || "Failed to delete category.", "error");
      }
    }
  };

  const handleEdit = (cat: ProductCategory) => {
    setFormData({
      id: cat.id,
      category: cat.categoryName,
      subCategory: cat.subCategoryName,
      description: cat.description,
    });
  };

  return (
    <div className="p-4">
      <MDBRow>
        <MDBCol md="8">
          <MDBCard className="border shadow-0 mb-4">
            <MDBCardBody>
              <MDBCardTitle>Product Category List</MDBCardTitle>
              {loading ? (
                <div className="text-center my-5">
                  <MDBSpinner role="status">
                    <span className="visually-hidden">Loading...</span>
                  </MDBSpinner>
                </div>
              ) : (
                <PaginatedTable
                  columns={[
                    { label: "Product Category", field: "categoryName" },
                    { label: "Product Sub Category", field: "subCategoryName" },
                  ]}
                  data={categories}
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

        <MDBCol md="4">
          <MDBCard className="border shadow-0 mb-4">
            <MDBCardBody>
              <MDBCardTitle className="mb-4">
                {formData.id ? "Edit Category" : "Add Category"}
              </MDBCardTitle>

              <label className="form-label">Product Category</label>
              <select
                className="form-select mb-4"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">-- Select Category --</option>
                <option value="Sea Foods">Sea Foods</option>
                <option value="Meat">Meat</option>
              </select>

              <label className="form-label">Product Sub Category</label>
              <MDBInput
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                className="mb-4"
                placeholder="Enter sub-category name"
              />

              <label className="form-label">Description</label>
              <textarea
                rows={5}
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control mb-3"
                placeholder="Add optional description..."
              />

              <MDBBtn color="dark" className="shadow-0 w-100" onClick={handleAddOrEdit}>
                <MDBIcon fas icon={formData.id ? "edit" : "plus"} className="me-2" />
                {formData.id ? "Save Changes" : "Add Category"}
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default ProductCategoryPanel;
