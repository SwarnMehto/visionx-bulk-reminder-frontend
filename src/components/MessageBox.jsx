"use client";

import { useState } from "react";

export default function MessageBox() {
  const [msg, setMsg] = useState("");

  return (
    <textarea
      rows={6}
      placeholder="Write your campaign message..."
      value={msg}
      onChange={(e) => setMsg(e.target.value)}
      style={{
        marginTop: 10,
      }}
    />
  );
}