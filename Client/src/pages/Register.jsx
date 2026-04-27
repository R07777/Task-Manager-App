import { useState } from "react";
import API from "../api";

export default function Register() {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", data);
      alert("Registered successfully");

      // login page pe bhej do
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
      <h2>Register</h2>

      <input
        type="email"
        placeholder="Email"
        required
        onChange={(e) =>
          setData({ ...data, email: e.target.value })
        }
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        required
        onChange={(e) =>
          setData({ ...data, password: e.target.value })
        }
      />

      <br /><br />

      <button type="submit">Register</button>

      <p>
        Already have an account?{" "}
        <a href="/login">Login</a>
      </p>
    </form>
  );
}