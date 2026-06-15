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
const handleUpload = async () => {
  if (!file) return alert("Select file");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("campaignId", campaignId);

  const res = await uploadCSVAPI(formData);

  const jobId = res.jobId;

  // 🔥 PROGRESS TRACKING START
  const interval = setInterval(async () => {
    const progressRes = await fetch(
      `${API}/api/contacts/progress/${jobId}`
    );

    const data = await progressRes.json();

    console.log("Progress:", data.progress);

    // stop when done
    if (data.progress >= 1000) {
      clearInterval(interval);
      alert("Upload Completed 🚀");
    }
  }, 1000);
};