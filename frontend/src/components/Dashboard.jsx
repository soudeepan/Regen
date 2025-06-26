import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {logOut, getAllItems, getAllMyItems, getAllMyOrders} from "../supabase"

function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
      const user = localStorage.getItem("user");
      if (!user) {
        navigate("/login");
      }
    }, [navigate]);

    const [myOrders, setMyOrders] = useState([]);
    const [mySales, setMySales] = useState([]);
    const [allItems, setAllItems] = useState([]);

    const parsed = JSON.parse(localStorage.getItem("user"));
    const userId = parsed?.user?.id;

    useEffect(() => {
      async function fetchData() {
        if (!userId) return;

        const { data: orders, error: ordersErr } = await getAllMyOrders(userId);
        const { data: sales, error: salesErr } = await getAllMyItems(userId);
        const { data: items, error: itemsErr } = await getAllItems();

        if (orders) setMyOrders(orders);
        if (sales) setMySales(sales);
        if (items) setAllItems(items);

        if (ordersErr) console.error("Orders Error:", ordersErr);
        if (salesErr) console.error("Sales Error:", salesErr);
        if (itemsErr) console.error("All Items Error:", itemsErr);
      }

      fetchData();
    }, [userId]);

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
