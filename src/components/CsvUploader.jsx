"use client";

import { useState } from "react";
import { uploadCSVAPI } from "../lib/api";

export default function CsvUploader({
  campaignId,
  onUploadSuccess,
}) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] =
    useState(false);

  const handleUpload = async () => {
    if (!file) {
      return alert("Select CSV File");
    }

    try {
      setLoading(true);

      const data =
        await uploadCSVAPI(
          file,
          campaignId
        );

      if (data?.success) {
        alert(
          `✅ ${data.total} Contacts Uploaded`
        );

        if (onUploadSuccess) {
          onUploadSuccess();
        }

      } else {
        alert(
          data?.message ||
            "Upload Failed"
        );
      }

    } catch (error) {
      console.log(error);

      alert("Upload Failed");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={(e) =>
          setFile(
            e.target.files[0]
          )
        }
      />

      <button
        onClick={handleUpload}
        style={{
          marginTop: 10,
          padding: 10,
        }}
      >
        {loading
          ? "Uploading..."
          : "Upload CSV"}
      </button>
    </div>
  );
}