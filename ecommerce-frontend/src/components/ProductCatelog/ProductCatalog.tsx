import React, { useState } from "react";
import {
    MDBCol,
    MDBRow,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
} from "mdb-react-ui-kit";
import type { ProductCategory } from "../../interface/ProductCategory";
import { ProductService } from "../../services/ProductService";
import type { Product } from "../../interface/Product";

interface ProductCatalogProps {
    productCategories: ProductCategory[];
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ productCategories }) => {
    const [productsList, setProductsList] = useState<Product[]>([]);

    const [selectedMain, setSelectedMain] = useState<string>("");
    const [selectedSub, setSelectedSub] = useState<string>("");

    const setSelectedMainHandler = (main: string) => {
        setSelectedMain(main);
        setSelectedSub("");
        setProductsList([]);
        if (main) {
            try {
                ProductService.getByCategory(main).then((products) => {
                    if (products) {
                        setProductsList(products);
                    }
                });
            } catch (error) {
                console.error("Error fetching products for category:", error);
            }
        }
    };

    const setSelectedSubHandler = (sub: string) => {
        console.log(sub);
        setSelectedSub(sub);
    }

    return (
        <MDBCol size="12" className="mt-4">
            <div
                style={{
                    background: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    padding: "20px",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                }}
            >
                <h4 style={{ color: "#ffffff", textDecoration: "underline" }}>
                    Select Your Choices
                </h4>

                {/* Category Filters */}
                <div className="pt-3">
                    <div>
                        <label style={{ color: "#e0e0e0" }}>Main Category</label>
                        <select
                            className="form-select"
                            value={selectedMain}
                            onChange={(e) => setSelectedMainHandler(e.target.value)}
                        >
                            <option value="">All Main Categories</option>
                            {productCategories.map((main) => (
                                <option key={main.id} value={main.id}>
                                    {main.subCategoryName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-3">
                        <label style={{ color: "#e0e0e0" }}>Sub Category</label>
                        <select
                            className="form-select"
                            value={selectedSub}
                            onChange={(e) => setSelectedSubHandler(e.target.value)}
                            disabled={!selectedMain}
                        >
                            <option value="">All Subcategories</option>
                            {productsList.map((sub) => (
                                <option key={sub.id} value={sub.id}>
                                    {sub.productName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <hr style={{ borderColor: "rgba(255,255,255,0.3)" }} />
                </div>
            </div>
        </MDBCol>
    );
};

export default ProductCatalog;
