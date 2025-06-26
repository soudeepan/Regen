import React from "react";

function Dashboard() {
  function logout() {
    alert("Logging out...");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }
  return (
    <div id="dashBody">
      <div className="dashboard">
        <header className="header">
          <h2>Dashboard</h2>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </header>

        <main className="main-content">
          <p>Welcome to your dashboard!</p>
          Add your dashboard widgets/components here
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
