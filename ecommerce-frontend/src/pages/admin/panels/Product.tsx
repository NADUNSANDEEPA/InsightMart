import React, { useEffect, useState, type ChangeEvent } from "react";
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
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import { ProductCategoryService } from "../../../services/ProductCategoryService";
import { ProductService } from "../../../services/ProductService";
import type { Product } from "../../../interface/Product";
import type { ProductCategory } from "../../../interface/ProductCategory";
import PaginatedTable from "../../../components/Table/PaginatedTable";
import CloudinaryUpload from "../../../components/CloudinaryUpload/CloudinaryUpload";

const ProductPanel: React.FC = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productCategory: "",
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const rowsPerPage = 7;

  // Fetch categories
  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const res = await ProductCategoryService.getAll("2");
      setCategories(res.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await ProductService.getAll("1");
      const productsWithId = (res.data || []).map((p: Product) => ({
        ...p,
        id: p.id || p.productCode,
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
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      productName: "",
      productDescription: "",
      productCategory: "",
    });
    setImageUrl("");
    setFile(null);
  };

  const handleAddOrUpdate = async () => {
    const categoryObj = categories.find(
      (cat) => cat.id === formData.productCategory
    );

    if (!categoryObj) {
      Swal.fire("Error", "Please select a category", "error");
      return;
    }

    const payload: Product = {
      id: editingId || Math.floor(Math.random() * 1000000).toString(),
      productCode: editingId || Math.floor(Math.random() * 1000000).toString(),
      productName: formData.productName,
      productDescription: formData.productDescription,
      productCategory: categoryObj,
      active: true,
      imageUrl: imageUrl,
    };

    try {
      if (editingId) {
        await ProductService.update(editingId, payload);
        Swal.fire({
          icon: "success",
          title: "Product Updated",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await ProductService.create(payload);
        Swal.fire({
          icon: "success",
          title: "Product Added",
          timer: 2000,
          showConfirmButton: false,
        });
      }

      resetForm();
      fetchProducts();
    } catch (error: any) {
      Swal.fire("Error", error.message || "Operation failed", "error");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);

    setFormData({
      productName: product.productName,
      productDescription: product.productDescription,
      productCategory: product.productCategory.id,
    });

    setImageUrl(product.imageUrl || "");
  };

  const handleToggleActiveProduct = (row: Product) => {
    Swal.fire({
      title: `Are you sure you want to ${row.active ? "deactivate" : "activate"} this product?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        ProductService.productActivateDeactivate(row.id)
          .then(() => {
            Swal.fire({
              title: "Updated!",
              text: `Product has been ${row.active ? "deactivated" : "activated"}.`,
              icon: "success",
            }).then(() => fetchProducts());
          })
          .catch((error) => {
            console.error("Error updating product status:", error);
            Swal.fire({
              title: "Error!",
              text: "There was an error updating the product.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <>
      <MDBCardTitle className="mb-0">Product Management</MDBCardTitle>
      <div className="p-4">
        <MDBRow>
          {/* Product List */}
          <MDBCol md="9">
            <MDBCard className="border shadow-0 mb-4 h-100">
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
                      { label: "Category", field: "productCategory.subCategoryName" },
                      { label: "Active / Inactive", field: "active", booleanDisplay: true },
                    ]}
                    data={products}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
                    onPageChange={setCurrentPage}
                    onEdit={handleEdit}
                    onToggleActive={handleToggleActiveProduct}
                  />
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          {/* Product Form */}
          <MDBCol md="3">
            <MDBCard className="border shadow-0 mb-4 h-100">
              <MDBCardBody>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <MDBCardTitle>{editingId ? "Edit Product" : "Add Product"}</MDBCardTitle>
                  <MDBBtn color="secondary" size="sm" outline onClick={resetForm}>
                    <MDBIcon fas icon="rotate-left" />
                  </MDBBtn>
                </div>

                {/* Category */}
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

                {/* Product Name */}
                <label>Product Name</label>
                <MDBInput
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  className="mb-4"
                />

                {/* Description */}
                <label>Description</label>
                <textarea
                  rows={5}
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleChange}
                  className="form-control mb-4"
                />

                <CloudinaryUpload
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                setFile={setFile}
                file={file}
              />

                {/* Submit */}
                <MDBBtn
                  color="dark"
                  className="shadow-0 w-100"
                  onClick={handleAddOrUpdate}
                  disabled={
                    !imageUrl ||
                    !formData.productName ||
                    !formData.productDescription ||
                    !formData.productCategory
                  }
                >
                  {editingId ? "Update Product" : "Add Product"}
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </div>
    </>
  );
};

export default ProductPanel;
