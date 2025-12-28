import React, { useState, type ChangeEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface CloudinaryUploadProps {
  imageUrl: string;
  setImageUrl: (url: string) => void;
  setFile: (file: File | null) => void;
  file: File | null;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

const CloudinaryUpload: React.FC<CloudinaryUploadProps> = ({
  imageUrl,
  setImageUrl,
  setFile,
}) => {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (selectedFile: File) => {

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      Swal.fire(
        "Invalid File Type",
        "Please select a JPEG, PNG, JPG, or WEBP image.",
        "error"
      );
      handleReset();
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      Swal.fire(
        "File Too Large",
        "Please select an image smaller than 5MB.",
        "error"
      );
      handleReset();
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "qfi2jn9c");

    try {
      setLoading(true);
      const res = await axios.post<{ secure_url: string }>(
        "https://api.cloudinary.com/v1_1/nadun/image/upload",
        formData
      );

      setImageUrl(res.data.secure_url);
      setFile(null);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setImageUrl("");
  };

  return (
    <div className="mb-4">
      <label className="form-label">Cover Image</label>

      {!imageUrl && (
        <>
          <input
            type="file"
            accept="image/*"
            className="form-control mb-2"
            disabled={loading}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const selectedFile = e.target.files?.[0];
              if (!selectedFile) return;

              setFile(selectedFile);
              setImageUrl("");
              handleUpload(selectedFile);
            }}
          />

          <small className="form-text text-muted d-block">
            Recommended size: 800×800 px · Max size: 2MB
          </small>

          {loading && (
            <small className="text-primary">
              Uploading image, please wait...
            </small>
          )}
        </>
      )}

      {imageUrl && (
        <div className="text-center mt-3">
          <img
            src={imageUrl}
            alt="Uploaded"
            style={{
              width: "220px",
              borderRadius: "10px",
              border: "1px solid #ddd",
            }}
          />

          <button
            className="btn btn-outline-secondary w-100 mt-3"
            onClick={handleReset}
          >
            Change Image
          </button>
        </div>
      )}
    </div>
  );
};

export default CloudinaryUpload;
