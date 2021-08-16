import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "./apiAdmin";

const AddProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          photo: '',
          price: '',
          quantity: '',
          loading: false,
          createdProduct: data.name
        });
      }
    });
  };

  const newProductForm = () => {
    return (
      <form className="mb-3">
        <h4>Add Photo</h4>
        <div className="form-group">
          <label htmlFor="photo" className="btn btn-secondary">
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange("photo")}
            />
          </label>
        </div>
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
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={handleChange("description")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={price}
            onChange={handleChange("price")}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Category</label>

          <select onChange={handleChange("category")} className="form-control">
            <option>Please select</option>
            {categories &&
              categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="shipping">Shipping</label>
          <select className="form-control" onChange={handleChange("shipping")}>
            <option>Please Select</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            value={quantity}
            onChange={handleChange("quantity")}
          />
        </div>
        <button onClick={clickSubmit} className="btn btn-primary">
          Creat Product
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
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2>{`${createdProduct}`} is created!</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );
  return (
    <Layout
      title="Add A New Product"
      description={`Hi, ${user.name}, Please add the details of Product`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newProductForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
