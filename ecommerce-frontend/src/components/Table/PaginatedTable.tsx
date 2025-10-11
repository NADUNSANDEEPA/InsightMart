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
}

interface PaginatedTableProps<T extends { id: string }> {
    columns: TableColumn[];
    data: T[];
    currentPage: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
    onEdit?: (row: T) => void;
    onDelete?: (id: string) => void;
}

const PaginatedTable = <T extends { id: string }>({
    columns,
    data,
    currentPage,
    rowsPerPage,
    onPageChange,
    onEdit,
    onDelete,
}: PaginatedTableProps<T>) => {
    const totalPages = Math.ceil(data.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentData = data.slice(startIndex, startIndex + rowsPerPage);

    // Utility to safely get nested field values
    const getValue = (obj: any, path: string) => {
        return path.split(".").reduce((acc, key) => acc?.[key], obj) ?? "";
    };

    return (
        <>
            <MDBTable hover responsive bordered>
                <MDBTableHead style={{ backgroundColor: "black" }}>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} className="text-white">
                                {col.label}
                            </th>
                        ))}
                        {(onEdit || onDelete) && <th className="text-white">Action</th>}
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
                                    <td key={i}>{getValue(row, col.field)}</td>
                                ))}

                                {(onEdit || onDelete) && (
                                    <td>
                                        {onEdit && (
                                            <MDBBtn
                                                size="sm"
                                                color="warning"
                                                className="me-2"
                                                outline
                                                onClick={() => onEdit(row)}
                                            >
                                                <MDBIcon fas icon="edit" />
                                            </MDBBtn>
                                        )}
                                        {onDelete && (
                                            <MDBBtn
                                                size="sm"
                                                color="danger"
                                                outline
                                                onClick={() => onDelete(row.id)}
                                            >
                                                <MDBIcon fas icon="trash" />
                                            </MDBBtn>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </MDBTableBody>
            </MDBTable>

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
