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
import CloudinaryUpload from "../../../components/CloudinaryUpload/CloudinaryUpload";

const ProductCategoryPanel: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    id: "",
    category: "",
    subCategory: "",
    description: "",
  });

  const [imageUrl, setImageUrl] = useState("");
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
      const res = await ProductCategoryService.getAll("1");
      setCategories(res.data || []);
      setCurrentPage(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddOrEdit = async () => {
    if (!formData.category || !formData.subCategory) {
      Swal.fire("Missing Fields", "Category and Sub Category required", "warning");
      return;
    }

    const payload: ProductCategory = {
      id: formData.id || Math.random().toString(),
      categoryName: formData.category,
      subCategoryName: formData.subCategory,
      description: formData.description,
      imageUrl: imageUrl,
      active: true,
    };

    try {
      if (formData.id) {
        await ProductCategoryService.update(payload.id, payload);
        Swal.fire("Updated!", "Category updated successfully", "success");
      } else {
        await ProductCategoryService.create(payload);
        Swal.fire("Added!", "Category added successfully", "success");
      }

      // RESET FORM
      setFormData({ id: "", category: "", subCategory: "", description: "" });
      setImageUrl("");
      fetchCategories();
      setFile(null);
    } catch (err) {
      Swal.fire("Error", "Operation failed", "error");
    }
  };

  const handleEdit = (cat: ProductCategory) => {
    setFormData({
      id: cat.id,
      category: cat.categoryName,
      subCategory: cat.subCategoryName,
      description: cat.description,
    });
    setImageUrl(cat.imageUrl || "");
  };

  const handleActiveProduct = (cat: ProductCategory) => {
    Swal.fire({
      title: `Are you sure you want to ${cat.active ? "deactivate" : "activate"} this category?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        ProductCategoryService.activateDeactivate(cat.id)
          .then(() => {
            Swal.fire("Success", "Category status updated", "success");
            fetchCategories();
          })
          .catch(() => {
            Swal.fire("Error", "Failed to update category status", "error");
          });
      }
    });
  };

  return (
    <>
      <MDBCardTitle>Product Category Management</MDBCardTitle>

      <MDBRow className="p-4">
        <MDBCol md="8">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Category List</MDBCardTitle>

              {loading ? (
                <MDBSpinner />
              ) : (
                <PaginatedTable
                  columns={[
                    { label: "Category", field: "categoryName" },
                    { label: "Sub Category", field: "subCategoryName" },
                    { label: "Active", field: "active", booleanDisplay: true },
                  ]}
                  data={categories}
                  currentPage={currentPage}
                  rowsPerPage={rowsPerPage}
                  onPageChange={setCurrentPage}
                  onEdit={handleEdit}
                  onToggleActive={handleActiveProduct}
                />
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="4">
          <MDBCard>
            <MDBCardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <MDBCardTitle className="mb-0">
                  {formData.id ? "Edit Category" : "Add Category"}
                </MDBCardTitle>

                <MDBBtn
                  color="secondary"
                  size="sm"
                  outline
                  onClick={() => {
                    setFormData({ id: "", category: "", subCategory: "", description: "" });
                    setImageUrl("");
                  }}
                >
                  <MDBIcon fas icon="rotate-left"/>
                </MDBBtn>
              </div>
              <div className="mb-4">
                <label className="form-label">Category</label>
                <select
                  className="form-select mb-3"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  <option value="Sea Foods">Sea Foods</option>
                  <option value="Meat">Meat</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label">Sub Category</label>
                <MDBInput
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleChange}
                  placeholder=""
                  className="mb-3"
                />
              </div>

              <CloudinaryUpload
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                setFile={setFile}
                file={file}
              />

              <div className="mb-4">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control mb-3"
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder=""
                />
              </div>

              <MDBBtn color="dark" className="w-100" disabled={imageUrl === "" || formData.category === "" || formData.subCategory === "" || formData.description === ""} onClick={handleAddOrEdit}>
                <MDBIcon fas icon={formData.id ? "edit" : "plus"} className="me-2" />
                {formData.id ? "Save Changes" : "Add Category"}
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow >
    </>
  );
};

export default ProductCategoryPanel;
