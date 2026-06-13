"use client";

import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";

import { getCampaignsAPI } from "../../lib/api";

import { useRouter } from "next/navigation";

export default function Campaigns() {
  const router = useRouter();

  const [campaigns, setCampaigns] = useState([]);

  const [loading, setLoading] = useState(true);

  // FETCH DATA
  const fetchCampaigns = async () => {
    try {
      const response = await getCampaignsAPI();

      console.log("API RESPONSE =>", response);

      if (response?.campaigns) {
        setCampaigns(response.campaigns);
      }

    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div style={styles.wrapper}>
      <Sidebar />

      <div style={styles.main}>
        {/* HEADER */}
        <div style={styles.top}>
          <h1 style={styles.heading}>
            📁 Campaigns
          </h1>

          <button
            style={styles.createBtn}
            onClick={() =>
              router.push("/create-campaign")
            }
          >
            ➕ Create Campaign
          </button>
        </div>

        {/* LOADING */}
        {loading ? (
          <div style={styles.loading}>
            Loading campaigns...
          </div>
        ) : campaigns.length === 0 ? (
          <div style={styles.empty}>
            <h2>No Campaigns Found</h2>

            <p>
              Create your first campaign 🚀
            </p>
          </div>
        ) : (
          <div style={styles.grid}>
            {campaigns.map((campaign) => (
              <div
                key={campaign._id}
                style={styles.card}
                onClick={() =>
                  router.push(
                    `/campaigns/${campaign._id}`
                  )
                }
              >
                <div style={styles.cardTop}>
                  <div style={styles.icon}>
                    📢
                  </div>

                  <span style={styles.status}>
                    {campaign.status}
                  </span>
                </div>

                <h2 style={styles.name}>
                  {campaign.name}
                </h2>

                <p style={styles.type}>
                  Type: {campaign.type}
                </p>

                <div style={styles.bottom}>
                  <button style={styles.openBtn}>
                    🚀 Open Campaign
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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

  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  heading: {
    margin: 0,
    fontSize: 32,
    fontWeight: 800,
  },

  createBtn: {
    background: "#4f46e5",
    color: "white",
    border: "none",
    padding: "12px 18px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 600,
  },

  loading: {
    padding: 40,
  },

  empty: {
    background: "white",
    padding: 40,
    borderRadius: 20,
    textAlign: "center",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill,minmax(280px,1fr))",
    gap: 20,
  },

  card: {
    background: "white",
    padding: 20,
    borderRadius: 20,
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  icon: {
    fontSize: 28,
  },

  status: {
    background: "#dcfce7",
    color: "#166534",
    padding: "6px 12px",
    borderRadius: 50,
    fontSize: 12,
    fontWeight: 600,
  },

  name: {
    marginTop: 20,
    marginBottom: 8,
  },

  type: {
    color: "#6b7280",
  },

  bottom: {
    marginTop: 25,
  },

  openBtn: {
    width: "100%",
    background: "#111827",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: 12,
    cursor: "pointer",
  },
};