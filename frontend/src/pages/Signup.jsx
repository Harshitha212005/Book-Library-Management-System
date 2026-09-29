import { useState } from "react";
import API from "../services/api";
import "./Login.css";


function Signup({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/signup", {
        name,
        email,
        password
      });

      alert(response.data.message);
      console.log(response.data);
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-logo">📚</div>

        <h1>Library</h1>

        <p className="login-subtitle">
          Create your library account.
        </p>

        <h2>Create Account</h2>

        <form className="login-form" onSubmit={handleSignup}>

          <label>Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="login-button" type="submit">
            Sign Up
          </button>

        </form>

        <p className="signup-text">
  Already have an account?{" "}
  <button type="button" onClick={onLogin}>
    Login
  </button>
</p>

      </div>
    </div>
  );
}

export default Signup;