import React from "react";

interface ProductSalesByReligion {
    product_name: string;
    sales_by_religion: Record<string, number>;
    total_quantity: number;
}

interface Props {
    data: ProductSalesByReligion[];
}

const ReligionSalesTable: React.FC<Props> = ({ data }) => {
    // Get unique religions from the first item
    const religions = Object.keys(data[0]?.sales_by_religion || {});

    return (
        <div className="table-responsive">
            <table className="table table-bordered table-striped">
                <thead className="table-light">
                    <tr>
                        <th>Product</th>
                        {religions.map((religion) => (
                            <th key={religion}>{religion}</th>
                        ))}
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.product_name}>
                            <td>{item.product_name}</td>
                            {religions.map((religion) => (
                                <td key={religion}>{item.sales_by_religion[religion] || 0}</td>
                            ))}
                            <td>{item.total_quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReligionSalesTable;
