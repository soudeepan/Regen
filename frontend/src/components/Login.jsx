import React, { useState } from "react";
import { login } from "../supabase";

function Login() {
  const [credential, setCredential] = useState({ email: "", password: "" });

  function handleChange(event) {
    const { type, value } = event.target;
    setCredential((prevData) => ({
      ...prevData,
      [type]: value,
    }));
  }

  async function handleSubmit(event) {
      event.preventDefault(); 
      const { data, error } = await login(credential.email, credential.password);
      localStorage.setItem('user', JSON.stringify(data));
      window.location.href = "/dashboard";
    }

  return (
    <div id="form">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <input
          onChange={handleChange}
          type="email"
          placeholder="Email"
          value={credential.email}
          required
        />
        <input
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={credential.password}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
