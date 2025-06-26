import React from "react";

function Signup() {
  return (
    <div id="form">
      <form class="signup-form">
        <h2>Sign Up</h2>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default Signup;
