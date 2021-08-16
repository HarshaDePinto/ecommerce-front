import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };
  const newCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={handleChange}
          />
        </div>

        <button onClick={clickSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  };

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Category Created
    </div>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {name} should be unique
    </div>
  );

  const goBack = () => (
    <div
      className="mt-5"
      
    >
      <Link to="/admin/dashboard" className="text-warning">
          Go Back To Dashboard
      </Link>
    </div>
  );
  return (
    <Layout
      title="Add A New Category"
      description={`Hi, ${user.name}, Please add the name of category`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}
            {newCategoryForm()}
            {goBack()}
            </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
