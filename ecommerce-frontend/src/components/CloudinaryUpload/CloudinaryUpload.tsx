import React, { useState, type ChangeEvent } from "react";
import axios from "axios";

const CloudinaryUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "YOUR_UPLOAD_PRESET");

    try {
      const res = await axios.post<{ secure_url: string }>(
        "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
        formData
      );

      setImageUrl(res.data.secure_url);
      console.log("Uploaded:", res.data.secure_url);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="container mt-4">
      <input
        type="file"
        className="form-control mb-4"
        onChange={handleFileChange}
      />
      <button className="btn btn-outline-black shadow-0" onClick={handleUpload}>
        Upload to Cloudinary
      </button>

      {imageUrl && (
        <div className="mt-3">
          <p>Uploaded Image:</p>
          <img
            src={imageUrl}
            alt="Uploaded"
            style={{ width: "200px", borderRadius: "8px" }}
          />
        </div>
      )}
    </div>
  );
};

export default CloudinaryUpload;
