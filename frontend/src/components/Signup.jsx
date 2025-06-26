import React, { useState } from "react";
import signUp from "../supabase";

function Signup() {
  const [credential, setCredential] = useState({ email: "", password: "" });

  function handleChange(event) {
    const { type, value } = event.target;
    setCredential((prevData) => {
      return {
        ...prevData,
        [type]: value,
      };
    });
  }

  return (
    <div id="form">
      <form className="signup-form">
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
        <button
          onClick={() => {
            signUp(credential.email, credential.password);
          }}
          type="submit"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Signup;
