"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import Sidebar from "../../../components/Sidebar";

import CsvUploader from "../../../components/CsvUploader";
import { launchCampaignAPI } from "../../../lib/api";

import {
  getSingleCampaignAPI,
  uploadCSVAPI,
} from "../../../lib/api";

export default function CampaignDetail() {
  const params = useParams();

  const [campaign, setCampaign] =
    useState(null);

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [uploading, setUploading] =
    useState(false);

  // LOAD CAMPAIGN
  useEffect(() => {
    fetchCampaign();
  }, []);

  const fetchCampaign = async () => {
    const res =
      await getSingleCampaignAPI(
        params.id
      );

    setCampaign(res.campaign);
  };

  // CSV UPLOAD
  const handleUpload = async () => {
    if (!selectedFile) {
      return alert("Select CSV file");
    }

    try {
      setUploading(true);

      const res = await uploadCSVAPI(
        selectedFile,
        params.id
      );

      alert(
        `✅ ${res.total} Contacts Uploaded`
      );

    } catch (error) {
      console.log(error);

    } finally {
      setUploading(false);
    }
  };
  const handleLaunch = async () => {
  try {
    const res =
      await launchCampaignAPI(
        params.id
      );

    alert(
      `✅ Sent: ${res.successCount}
❌ Failed: ${res.failedCount}`
    );

  } catch (error) {
    console.log(error);
  }
};

  if (!campaign)
    return <p>Loading...</p>;

  return (
    <div style={styles.wrapper}>
      <Sidebar />

      <div style={styles.main}>
        {/* HEADER */}
        <div style={styles.header}>
          <h1>{campaign.name}</h1>

          <span style={styles.badge}>
            {campaign.type}
          </span>
        </div>

        {/* INFO CARD */}
        <div style={styles.card}>
          <h2>Campaign Details</h2>

          <p>
            Status:
            <b> {campaign.status}</b>
          </p>

          <p>
            Type:
            <b> {campaign.type}</b>
          </p>
        </div>

        {/* CSV CARD */}
        <div style={styles.card}>
          <h2>Upload Contacts CSV</h2>

          <CsvUploader
            onFileSelect={setSelectedFile}
          />

          <button
            style={styles.btn}
            onClick={handleUpload}
          >
            {uploading
              ? "Uploading..."
              : "🚀 Upload Contacts"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    background: "#f5f7fb",
  },

  main: {
    flex: 1,
    padding: 25,
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  badge: {
    background: "#dbeafe",
    color: "#1d4ed8",
    padding: "8px 14px",
    borderRadius: 30,
    fontWeight: 600,
  },

  card: {
    background: "white",
    padding: 25,
    borderRadius: 20,
    marginBottom: 20,
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.05)",
  },

  btn: {
    marginTop: 20,
    width: "100%",
    padding: 14,
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 600,
  },
};