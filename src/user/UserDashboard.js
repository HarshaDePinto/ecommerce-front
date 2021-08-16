import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const userLink = () => {
    return (
      <div className="card">
        <h4 className="card-title"> User Link</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/cart" className="nav-link">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/profile" className="nav-link">
              My Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">Name: {name}</li>
          <li className="list-group-item">Email: {email}</li>
          <li className="list-group-item">
            Role: {role === 1 ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
    );
  };

  const userHistory = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Purchase History</h3>
        <ul className="list-group">
          <li className="list-group-item">Name:</li>
        </ul>
      </div>
    );
  };
  return (
    <Layout
      title="Dashboard"
      description={`Hi ${name}`}
      className="container"
    >
      <div className="row">
        <div className ="col-3">
            {userLink()}
        </div>
        <div className ="col-9">
            {userInfo()}
            {userHistory()}
        </div>
      </div>

    </Layout>
  );
};

export default Dashboard;
