import { useState } from "react";
import API from "../services/api";
import "./Login.css";

function Login({ onSignup , onLoginSuccess}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", {
        email,
        password
      });

      alert(response.data.message);
      onLoginSuccess();
      console.log(response.data);
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
  <div className="login-page">
    <div className="login-card">

      <div className="login-logo">📚</div>

      <h1>Library</h1>

      <p className="login-subtitle">
        Your books, organized.
      </p>

      <h2>Welcome Back</h2>

      <form className="login-form" onSubmit={handleLogin}>

        <label>Email</label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="login-button" type="submit">
          Login
        </button>

      </form>

      <p className="signup-text">
  Don't have an account?{" "}
  <button type="button" onClick={onSignup}>
    Sign Up
  </button>
</p>

    </div>
  </div>
);
}

export default Login;