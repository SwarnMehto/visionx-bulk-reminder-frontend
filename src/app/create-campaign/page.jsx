"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import Sidebar from "../../components/Sidebar";

import {
  createCampaignAPI,
} from "../../lib/api";

export default function CreateCampaign() {
  const router =
    useRouter();

  const [form, setForm] =
    useState({
      name: "",
      type: "whatsapp",
    });

  const handleCreate =
    async () => {
      try {
        const data =
          await createCampaignAPI(
            form
          );

        if (data.success) {
          alert(
            "Campaign Created 🚀"
          );

          router.push(
            "/campaigns"
          );

        } else {
          alert(
            data.message
          );
        }

      } catch (error) {
        console.log(error);

        alert(
          "Error creating campaign"
        );
      }
    };

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Sidebar />

      <div style={styles.main}>
        <h2>
          ➕ Create Campaign
        </h2>

        <div
          style={styles.card}
        >
          <input
            placeholder="Campaign Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,

                name:
                  e.target.value,
              })
            }
          />

          <select
            value={form.type}
            onChange={(e) =>
              setForm({
                ...form,

                type:
                  e.target.value,
              })
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

          <button
            onClick={
              handleCreate
            }
          >
            🚀 Create Campaign
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  main: {
    flex: 1,

    padding: 20,
  },

  card: {
    background: "white",

    padding: 20,

    borderRadius: 12,

    display: "flex",

    flexDirection:
      "column",

    gap: 12,

    maxWidth: 450,
  },
};