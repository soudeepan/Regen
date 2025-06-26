import React from "react";

function Dashboard() {
  function logout() {
    alert("Logging out...");
    logOut();
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

          <div className="myOrder">
            <h3>My Orders</h3>
            <ul>
              {myOrders.map((order, index) => (
                <li key={index}>{JSON.stringify(order)}</li>
              ))}
            </ul>
          </div>

          <div className="mySale">
            <h3>My Items for Sale</h3>
            <ul>
              {mySales.map((item, index) => (
                <li key={index}>{JSON.stringify(item)}</li>
              ))}
            </ul>
          </div>

          <div className="allSale">
            <h3>All Available Items</h3>
            <ul>
              {allItems.map((item, index) => (
                <li key={index}>{JSON.stringify(item)}</li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
