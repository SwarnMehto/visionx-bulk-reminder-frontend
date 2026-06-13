"use client";

import Sidebar from "../../components/Sidebar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addCampaign } from "../../lib/campaignStore";

export default function CreateCampaign() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    message: "",
    type: "whatsapp",
  });

  const handleSubmit = () => {
    if (!form.name || !form.message) return;

    addCampaign(form);

    alert("Campaign Created Successfully 🚀");

    router.push("/campaigns");
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={styles.main}>
        <h2>➕ Create Campaign</h2>

        <div className="card">
          <input
            placeholder="Campaign Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <textarea
            rows={5}
            placeholder="Message"
            style={{ marginTop: 10 }}
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
          />

          <select
            style={{ marginTop: 10, width: "100%" }}
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
          >
            <option value="whatsapp">WhatsApp</option>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
          </select>

          <button
            onClick={handleSubmit}
            style={styles.btn}
          >
            Create Campaign
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

  btn: {
    marginTop: 15,
    background: "#4f46e5",
    color: "white",
    width: "100%",
  },
};