"use client";

import {
  useState,
} from "react";

import {
  uploadCSVAPI,
} from "../lib/api";

export default function CsvUploader({
  campaignId,
}) {
  const [file, setFile] =
    useState(null);

  const handleUpload =
    async () => {
      if (!file) {
        return alert(
          "Select CSV File"
        );
      }

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      formData.append(
        "campaignId",
        campaignId
      );

      try {
        const data =
          await uploadCSVAPI(
            formData
          );

        if (data.success) {
          alert(
            `Uploaded ${data.total} contacts 🚀`
          );

        } else {
          alert(
            data.message
          );
        }

      } catch (error) {
        console.log(error);

        alert(
          "Upload Failed"
        );
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
        onClick={
          handleUpload
        }
        style={{
          marginTop: 10,
        }}
      >
        Upload CSV
      </button>
    </div>
  );
}