"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import { createCampaignAPI } from "../../lib/api";

export default function CreateCampaign() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      partyName: "",
      type: "whatsapp",
      message: "",
    });

  const [poster, setPoster] =
    useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };


  const handleSubmit =
    async () => {
      try {
        if (!formData.name) {
          return alert(
            "Campaign Name Required"
          );
        }

        setLoading(true);

        const response =
          await createCampaignAPI(
            formData
          );

        if (
          response?.campaign?._id
        ) {
          alert(
            "✅ Campaign Created"
          );

          router.push(
            `/campaigns/${response.campaign._id}`
          );
        }

      } catch (error) {
        console.log(error);

        alert(
          "Failed to create campaign"
        );

      } finally {
        setLoading(false);
      }
    };

  return (
    <div style={styles.wrapper}>
      <Sidebar />

      <div style={styles.main}>
        <h1 style={styles.title}>
          🚀 Create Campaign
        </h1>

        <div style={styles.container}>
          {/* LEFT */}
          <div style={styles.left}>
            <div style={styles.card}>
              <h2>
                Campaign Details
              </h2>

              <input
                type="text"
                name="name"
                placeholder="Campaign Name"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                style={
                  styles.input
                }
              />

              <input
                type="text"
                name="partyName"
                placeholder="Party Name"
                value={
                  formData.partyName
                }
                onChange={
                  handleChange
                }
                style={
                  styles.input
                }
              />

              <select
                name="type"
                value={
                  formData.type
                }
                onChange={
                  handleChange
                }
                style={
                  styles.input
                }
              >
                <option value="whatsapp">
                  WhatsApp
                </option>

                <option value="email">
                  Email
                </option>

                <option value="sms">
                  SMS
                </option>
              </select>
            </div>

            <div style={styles.card}>
              <h2>
                Message
              </h2>

              <textarea
                rows={8}
                name="message"
                placeholder="Write campaign message..."
                value={
                  formData.message
                }
                onChange={
                  handleChange
                }
                style={
                  styles.textarea
                }
              />
            </div>

            <div style={styles.card}>
              <h2>
                Poster Upload
              </h2>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setPoster(
                    e.target.files[0]
                  )
                }
              />

              {poster && (
                <p>
                  ✅ {poster.name}
                </p>
              )}
            </div>

            <button
              onClick={
                handleSubmit
              }
              style={
                styles.button
              }
            >
              {loading
                ? "Creating..."
                : "🚀 Create Campaign"}
            </button>
          </div>

          {/* RIGHT */}
          <div style={styles.right}>
            <div style={styles.preview}>
              <h2>
                Live Preview
              </h2>

              <p>
                <b>
                  Campaign:
                </b>{" "}
                {
                  formData.name
                }
              </p>

              <p>
                <b>
                  Party:
                </b>{" "}
                {
                  formData.partyName
                }
              </p>

              <p>
                <b>
                  Type:
                </b>{" "}
                {
                  formData.type
                }
              </p>

              <hr />

              <p>
                {
                  formData.message
                }
              </p>

              {poster && (
                <p>
                  📷 Poster
                  Ready
                </p>
              )}
            </div>
          </div>
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

  title: {
    fontSize: 32,
    fontWeight: 800,
    marginBottom: 20,
  },

  container: {
    display: "grid",
    gridTemplateColumns:
      "2fr 1fr",
    gap: 20,
  },

  left: {
    display: "flex",
    flexDirection:
      "column",
    gap: 20,
  },

  right: {},

  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 20,
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.05)",
  },

  input: {
    width: "100%",
    padding: 14,
    marginTop: 12,
    borderRadius: 10,
    border:
      "1px solid #ddd",
  },

  textarea: {
    width: "100%",
    padding: 14,
    marginTop: 12,
    borderRadius: 10,
    border:
      "1px solid #ddd",
  },

  button: {
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    padding: 16,
    borderRadius: 12,
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 700,
  },

  preview: {
    background: "#fff",
    padding: 20,
    borderRadius: 20,
    position: "sticky",
    top: 20,
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.05)",
  },
};