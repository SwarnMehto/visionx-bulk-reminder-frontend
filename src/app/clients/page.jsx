"use client";

import { useEffect, useState } from "react";

export default function Clients() {
  const [clients, setClients] =
    useState([]);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients =
    async () => {
      const token =
        localStorage.getItem(
          "token"
        );

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/clients`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await res.json();

      setClients(
        data.clients || []
      );
    };

  return (
    <div
      style={{
        padding: 30,
      }}
    >
      <h1>
        👥 Clients
      </h1>

      {clients.map(
        (client) => (
          <div
            key={client._id}
            style={{
              background:
                "white",
              padding: 15,
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            {client.name}
          </div>
        )
      )}
    </div>
  );
}