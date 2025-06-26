import React from "react";

function Login() {
  return (
    <div id="form">
      <form className="signup-form">
        <h2>Log In</h2>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
