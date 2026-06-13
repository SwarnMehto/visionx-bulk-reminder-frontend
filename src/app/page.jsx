"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";

import {
  loginAPI,
} from "../lib/api";

export default function Login() {
  const router = useRouter();

  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  const handleLogin =
    async () => {
      try {
        const data =
          await loginAPI(form);

        if (data.success) {
          // TOKEN
          localStorage.setItem(
            "token",
            data.token
          );

          // USER
          localStorage.setItem(
            "user",
            JSON.stringify(
              data.user
            )
          );

          alert(
            "Login Successful 🚀"
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
          "Login Failed"
        );
      }
    };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>VisionX Login</h2>

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
            handleLogin
          }
        >
          Login
        </button>

        <Link href="/register">
          Create Account
        </Link>
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