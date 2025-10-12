import React, { useEffect, useState } from "react";
import {
    MDBCardTitle,
    MDBBtn,
    MDBIcon,
    MDBSpinner,
} from "mdb-react-ui-kit";
import { CustomerService } from "../../../services/CustomerService";
import PaginatedTable from "../../../components/Table/PaginatedTable";
import Swal from "sweetalert2";

const UserPanel: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const rowsPerPage = 7;

    const handleEdit = (user: any) => {
        console.log("Edit user:", user);
    };

    const handleDelete = (user: any) => {
        console.log("Delete user:", user);
    };

    useEffect(() => {
        setLoading(true);
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        CustomerService.getAll()
            .then((data) => {
                const userData = Array.isArray(data.data)
                    ? data.data
                    : data.data?.users || [];
                setUsers(userData);
            })
            .catch((err) => {
                console.error("Error fetching users:", err);
            })
            .finally(() => setLoading(false));
    };

    function handleToggleActiveProduct(row: any): void {
        Swal.fire({
            title: `Are you sure you want to ${row.active ? 'deactivate' : 'activate'} this user?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                CustomerService.userActivateDeactivate(row.id)
                    .then(() => {
                        Swal.fire({
                            title: 'Updated!',
                            text: `User has been ${row.active ? 'deactivated' : 'activated'}.`,
                            icon: 'success',
                        }).then(() => fetchUsers());
                    })
                    .catch((error) => {
                        console.error("Error updating user status:", error);
                        Swal.fire({
                            title: 'Error!',
                            text: 'There was an error updating the user.',
                            icon: 'error',
                        });
                    });
            }
        });
    }

    return (
        <>
            <MDBCardTitle className="mb-0">User Management</MDBCardTitle>
            <div className="d-flex align-items-center mb-3 mt-3">
                <MDBBtn color="primary" size="sm" outline className="shadow-0 ms-auto">
                    <MDBIcon fas icon="user-shield" className="me-2" />
                    Manage Admin Users
                </MDBBtn>
            </div>

            {loading ? (
                <div className="text-center my-5">
                    <MDBSpinner role="status">
                        <span className="visually-hidden">Loading...</span>
                    </MDBSpinner>
                </div>
            ) : (
                <PaginatedTable
                    data={Array.isArray(users) ? users : []}
                    columns={[
                        { label: "Full Name", field: "fullName" },
                        { label: "Email", field: "email" },
                        { label: "Address", field: "address" },
                        { label: "Telephone", field: "phone" },
                        { label: "Customer Type", field: "customerType" },
                        { label: "Active / Inactive", field: "active", booleanDisplay: true },
                    ]}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
                    onPageChange={setCurrentPage}
                    onEdit={handleEdit}
                    onToggleActive={handleToggleActiveProduct}
                />
            )}
        </>
    );
};

export default UserPanel;
