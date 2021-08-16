import React, { useState } from "react";
import Layout from "../core/Layout";
import { signUp } from "../auth";

import { Link } from "react-router-dom";

const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const { name, email, password, success, error } = values;

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signUp({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          error: "",
          name: "",
          email: "",
          password: "",
          success: true,
        });
      }
    });
  };
  const signUpForm = () => {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={handleChange("name")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={handleChange("email")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={handleChange("password")}
          />
        </div>

        <button onClick={clickSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New Account Created, <Link to="/sign-in">Please Sign In</Link>
    </div>
  );

  return (
    <Layout
      title="SignUp Page"
      description="This is SignUp page"
      className="container-fluid col-md-8 offset-md-2"
    >
      {showError()}
      {showSuccess()}
      {signUpForm()}
      
    </Layout>
  );
};

export default SignUp;
