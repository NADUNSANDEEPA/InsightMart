import type { AxiosError } from "axios";
import Swal from "sweetalert2";

export const handleApiError = (error: AxiosError): never => {
    let message = "An unexpected error occurred";

    if (error.response) {
        console.error("❌ Server Error:", error.response.data);
        message =
            (error.response.data as any)?.message ||
            `Server error (${error.response.status})`;
    } else if (error.request) {
        console.error("⚠️ No Response from Server:", error.request);
        message = "No response from server. Please try again later.";
    } else {
        console.error("⚡ Request Setup Error:", error.message);
        message = `Unexpected error: ${error.message}`;
    }

    Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
    });

    throw new Error(message);
};