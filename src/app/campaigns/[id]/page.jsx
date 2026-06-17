"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Sidebar from "../../../components/Sidebar";
import CsvUploader from "../../../components/CsvUploader";

import {
  getSingleCampaignAPI,
  uploadCSVAPI,
  updateCampaignAPI,
  launchCampaignAPI,
} from "../../../lib/api";

export default function CampaignDetail() {
  const params = useParams();

  const [campaign, setCampaign] =
    useState(null);

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [uploading, setUploading] =
    useState(false);

  const [launching, setLaunching] =
    useState(false);

  const [message, setMessage] =
    useState("");

const [partyName, setPartyName] =
  useState("");

  // LOAD CAMPAIGN
  useEffect(() => {
    fetchCampaign();
  }, []);

  const fetchCampaign = async () => {
    try {
      const res =
        await getSingleCampaignAPI(
          params.id
        );

      setCampaign(res.campaign);

setMessage(
  res.campaign.message || ""
);

setPartyName(
  res.campaign.partyName || ""
);

    } catch (error) {
      console.log(error);
    }
  };

  // CSV UPLOAD
  const handleUpload = async () => {
    if (!selectedFile) {
      return alert(
        "Select CSV file"
      );
    }

    try {
      setUploading(true);

      const res =
        await uploadCSVAPI(
          selectedFile,
          params.id
        );

      alert(
        `✅ ${res.total} Contacts Uploaded`
      );

    } catch (error) {
      console.log(error);

      alert(
        "CSV Upload Failed"
      );

    } finally {
      setUploading(false);
    }
  };

  const handleSave =
  async () => {
    try {
      await updateCampaignAPI(
        params.id,
        {
          message,
          partyName,
        }
      );

      alert(
        "✅ Campaign Updated"
      );

    } catch (error) {
      console.log(error);
    }
  };

  // LAUNCH CAMPAIGN
  const handleLaunch = async () => {
    try {
      setLaunching(true);

      const res =
        await launchCampaignAPI(
          params.id
        );

      alert(
        `✅ Campaign Sent

Sent: ${res.successCount || 0}
Failed: ${res.failedCount || 0}`
      );

      fetchCampaign();

    } catch (error) {
      console.log(error);

      alert(
        "Campaign Launch Failed"
      );

    } finally {
      setLaunching(false);
    }
  };

  if (!campaign) {
    return <p>Loading...</p>;
  }

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

        {/* DETAILS */}
        <div style={styles.card}>
          <h2>
            Campaign Details
          </h2>

          <p>
            Status:
            <b>
              {" "}
              {campaign.status}
            </b>
          </p>

          <p>
            Type:
            <b>
              {" "}
              {campaign.type}
            </b>
          </p>
        </div>

        {/* CSV */}
        <div style={styles.card}>
          <h2>
            Upload Contacts CSV
          </h2>

          <CsvUploader
  campaignId={params.id}
  onUploadSuccess={
    fetchCampaign
  }
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
        <div style={styles.card}>
  <h2>Campaign Editor</h2>

  <input
    value={partyName}
    onChange={(e) =>
      setPartyName(e.target.value)
    }
    placeholder="Party Name"
    style={{
      width: "100%",
      padding: 12,
      marginBottom: 15,
      border: "1px solid #ddd",
      borderRadius: 10,
    }}
  />

  <textarea
    rows={8}
    value={message}
    onChange={(e) =>
      setMessage(e.target.value)
    }
    placeholder="Campaign Message"
    style={{
      width: "100%",
      padding: 12,
      borderRadius: 10,
      border: "1px solid #ddd",
    }}
  />

  <button
    style={styles.btn}
    onClick={handleSave}
  >
    💾 Save Changes
  </button>
</div>


        {/* SEND BUTTON */}
        <button
          style={
            styles.launchBtn
          }
          onClick={
            handleLaunch
          }
        >
          {launching
            ? "Sending..."
            : "🚀 Send Campaign"}
        </button>
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
    justifyContent:
      "space-between",
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

  textarea: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    border:
      "1px solid #d1d5db",
    fontSize: 15,
    resize: "vertical",
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

  launchBtn: {
    width: "100%",
    padding: 18,
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: 14,
    cursor: "pointer",
    fontSize: 18,
    fontWeight: 700,
  },
};
