"use client";

import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", icon: "📊", path: "/dashboard" },
    { name: "Campaigns", icon: "📁", path: "/campaigns" },
    { name: "Create Campaign", icon: "➕", path: "/create" },
    { name: "Clients", icon: "👥", path: "/clients" },
    { name: "Contacts Upload", icon: "📤", path: "/upload" },
    { name: "Reports", icon: "📈", path: "/reports" },
    { name: "Analytics", icon: "📊", path: "/analytics" },
    { name: "Billing", icon: "💳", path: "/billing" },
    { name: "Settings", icon: "⚙️", path: "/settings" },
  ];

  return (
    <div style={styles.sidebar}>
      {/* LOGO */}
      <div style={styles.logo}>⚡ VisionX</div>

      {/* MENU (TOP ALIGNED) */}
      <div style={styles.menu}>
        {menu.map((item) => (
          <div
            key={item.name}
            onClick={() => router.push(item.path)}
            style={{
              ...styles.item,
              background:
                pathname === item.path ? "#1f2937" : "transparent",
              color: pathname === item.path ? "#ffffff" : "#cbd5e1",
            }}
          >
            <span style={{ marginRight: "10px" }}>{item.icon}</span>
            {item.name}
          </div>
        ))}
      </div>

      {/* BOTTOM SECTION */}
      <div style={styles.bottom}>
        <div
          style={styles.logout}
          onClick={() => {
            localStorage.removeItem("user");
            router.push("/");
          }}
        >
          🚪 Logout
        </div>
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "260px",
    height: "100vh",
    background: "#0b1220",
    color: "#cbd5e1",
    padding: "20px",
    display: "flex",
    flexDirection: "column",

    /* IMPORTANT FIX → TOP ALIGN */
    justifyContent: "flex-start",
  },

  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "white",
    paddingBottom: "15px",
    borderBottom: "1px solid #1e293b",
  },

  menu: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: 1, // takes full space so menu stays top
  },

  item: {
    padding: "10px 12px",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "0.2s",
    fontSize: "14px",
  },

  bottom: {
    borderTop: "1px solid #1e293b",
    paddingTop: "12px",
  },

  logout: {
    color: "#ef4444",
    cursor: "pointer",
    padding: "10px",
    borderRadius: "10px",
  },
};