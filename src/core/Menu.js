import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signOut, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffff" };
  }
};

const Menu = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/shop")}
            to="/shop"
          >
            Shop
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/cart")}
            to="/cart"
          >
            Cart{" "}
            <sup>
              <small className="cart-badge">{itemTotal()}</small>
            </sup>
          </Link>
        </li>

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/admin/dashboard")}
                to="/admin/dashboard"
              >
                Dashboard
              </Link>
            </li>
          </Fragment>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/user/dashboard")}
                to="/user/dashboard"
              >
                Dashboard
              </Link>
            </li>
          </Fragment>
        )}

        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/sign-in")}
                to="/sign-in"
              >
                Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/sign-up")}
                to="/sign-up"
              >
                Sign Up
              </Link>
            </li>
          </Fragment>
        )}
        {isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <span
                className="nav-link"
                style={{ cursor: "pointer", color: "#ffff" }}
                onClick={() =>
                  signOut(() => {
                    history.push("/");
                  })
                }
              >
                Sign Out
              </span>
            </li>
          </Fragment>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
