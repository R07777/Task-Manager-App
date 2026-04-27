import { useState } from "react";
import API from "../api";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });

  const handleSubmit = async () => {
  console.log("Clicked"); // 👈 MUST ADD

  try {
    const res = await API.post("/auth/login", data);
    console.log(res.data); // 👈 check response

    localStorage.setItem("token", res.data.token);
    window.location.href = "/";
  } catch (err) {
    console.log(err.response?.data);
    alert(err.response?.data || "Login failed");
  }
};

  return (
    <div>
      <input placeholder="Email" onChange={e => setData({...data, email:e.target.value})}/>
      <input placeholder="Password" type="password" onChange={e => setData({...data, password:e.target.value})}/>
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}