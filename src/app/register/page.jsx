"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  registerAPI,
} from "../../lib/api";

export default function Register() {
  const router = useRouter();

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleRegister =
    async () => {
      try {
        const data =
          await registerAPI(form);

        if (data.success) {
          // SAVE TOKEN
          localStorage.setItem(
            "token",
            data.token
          );

          // SAVE USER
          localStorage.setItem(
            "user",
            JSON.stringify(
              data.user
            )
          );

          alert(
            "Registration Successful 🚀"
          );

          router.push(
            "/dashboard"
          );

        } else {
          alert(
            data.message
          );
        }

      } catch (error) {
        console.log(error);

        alert(
          "Registration Failed"
        );
      }
    };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>
          Create Account
        </h2>

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email:
                e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password:
                e.target.value,
            })
          }
        />

        <button
          onClick={
            handleRegister
          }
        >
          Register
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent:
      "center",
    alignItems: "center",
    background:
      "#f5f7fb",
  },

  card: {
    width: 350,
    background: "white",
    padding: 25,
    borderRadius: 16,
    display: "flex",
    flexDirection:
      "column",
    gap: 12,
  },
};