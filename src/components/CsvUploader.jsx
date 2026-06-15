"use client";

import { useState } from "react";
import { uploadCSVAPI } from "../lib/api";

export default function CsvUploader({ campaignId }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      return alert("Select CSV File");
    }

    try {
      const data = await uploadCSVAPI(file, campaignId);

      if (data?.success) {
        alert(`Uploaded ${data.total} contacts 🚀`);
      } else {
        alert(data?.message || "Upload failed");
      }
    } catch (error) {
      console.log(error);
      alert("Upload Failed");
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload} style={{ marginTop: 10 }}>
        Upload CSV
      </button>
    </div>
  );
}