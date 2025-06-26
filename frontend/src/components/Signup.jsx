import React, { useState } from "react";
import {signUp} from "../supabase";

function Signup() {
  const [credential, setCredential] = useState({ email: "", password: "" });

  function handleChange(event) {
    const { type, value } = event.target;
    setCredential((prevData) => ({
      ...prevData,
      [type]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault(); // Prevent page reload
    const { data, error } = await signUp(credential.email, credential.password);
    console.log("Signup Data:", data);
    console.log("Signup Error:", error);
  }

  return (
    <div id="form">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
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
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default Signup;
