import {
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBBtn,
    MDBIcon,
    MDBPagination,
    MDBPaginationItem,
    MDBPaginationLink,
} from "mdb-react-ui-kit";

interface TableColumn {
    label: string;
    field: string;
    booleanDisplay?: boolean;
}

interface PaginatedTableProps<T extends { id: string; active?: boolean }> {
    columns: TableColumn[];
    data: T[];
    currentPage: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
    onEdit?: (row: T) => void;
    onToggleActive?: (row: T) => void;
}

const PaginatedTable = <T extends { id: string; active?: boolean }>({
    columns,
    data,
    currentPage,
    rowsPerPage,
    onPageChange,
    onEdit,
    onToggleActive,
}: PaginatedTableProps<T>) => {
    const totalPages = Math.ceil(data.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentData = data.slice(startIndex, startIndex + rowsPerPage);

    const getValue = (obj: any, col: TableColumn) => {
        const value = col.field.split(".").reduce((acc, key) => acc?.[key], obj);
        if (col.booleanDisplay && typeof value === "boolean") return value ? "Active" : "Inactive";
        return value === undefined || value === null ? "" : value;
    };

    return (
        <>
            <div style={{ overflowX: "auto", width: "100%" }}>
                <MDBTable hover bordered>
                    <MDBTableHead style={{ backgroundColor: "black" }}>
                        <tr>
                            {columns.map((col, index) => (
                                <th key={index} className="text-white text-center">
                                    {col.label}
                                </th>
                            ))}
                            {(onEdit || onToggleActive) && <th className="text-white text-center">Action</th>}
                        </tr>
                    </MDBTableHead>

                    <MDBTableBody>
                        {currentData.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + 1} className="text-center">
                                    No records found.
                                </td>
                            </tr>
                        ) : (
                            currentData.map((row) => (
                                <tr key={row.id}>
                                    {columns.map((col, i) => (
                                        <td key={i}>{getValue(row, col)}</td>
                                    ))}

                                    {(onEdit || onToggleActive) && (
                                        <td className="text-center">
                                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                                {onEdit && (
                                                    <MDBBtn
                                                        size="sm"
                                                        color="warning"
                                                        outline
                                                        onClick={() => onEdit(row)}
                                                    >
                                                        <MDBIcon fas icon="edit" />
                                                    </MDBBtn>
                                                )}
                                                {onToggleActive && (
                                                    <MDBBtn
                                                        size="sm"
                                                        color={row.active ? "success" : "secondary"}
                                                        outline
                                                        onClick={() => onToggleActive(row)}
                                                    >
                                                        {row.active ? "Inactive" : "Active"}
                                                    </MDBBtn>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </MDBTableBody>
                </MDBTable>
            </div>

            {totalPages > 1 && (
                <nav className="d-flex justify-content-center mt-3">
                    <MDBPagination className="mb-0">
                        <MDBPaginationItem disabled={currentPage === 1}>
                            <MDBPaginationLink
                                href="#!"
                                onClick={() => onPageChange(currentPage - 1)}
                            >
                                Previous
                            </MDBPaginationLink>
                        </MDBPaginationItem>

                        {Array.from({ length: totalPages }, (_, index) => (
                            <MDBPaginationItem key={index} active={currentPage === index + 1}>
                                <MDBPaginationLink
                                    href="#!"
                                    onClick={() => onPageChange(index + 1)}
                                >
                                    {index + 1}
                                </MDBPaginationLink>
                            </MDBPaginationItem>
                        ))}

                        <MDBPaginationItem disabled={currentPage === totalPages}>
                            <MDBPaginationLink
                                href="#!"
                                onClick={() => onPageChange(currentPage + 1)}
                            >
                                Next
                            </MDBPaginationLink>
                        </MDBPaginationItem>
                    </MDBPagination>
                </nav>
            )}
        </>
    );
};

export default PaginatedTable;
