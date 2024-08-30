import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Endpoints from "../api/Endpoints";

const SignUp = () => {
  const navigate = useNavigate();

  const [requestResponse, setRequestResponse] = useState({
    textMessage: "",
    alertClass: "",
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  };

  const onSubmit = (values) => {
    axios
      .post(Endpoints.REGISTER_URL, values)
      .then((response) => {
        console.log(response.data);
        setRequestResponse({
          textMessage: "Registration successful",
          alertClass: "alert alert-success",
        });

        // Delay navigation to login page
        setTimeout(() => {
          navigate('/login', { state: { successMessage: "Registration successful, The Fake Store API does not store user registration data; instead, it provides a default user ID and password for authentication purposes." } });
        }, 1000); // Delay of 1 seconds
      })
      .catch((error) => {
        setRequestResponse({
          textMessage: error.response?.data?.message || "Registration failed",
          alertClass: "alert alert-danger",
        });
      });
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="wrapper">
            <div className={requestResponse.alertClass} role="alert">
              {requestResponse.textMessage}
            </div>
            <h2 className="text-center">Sign Up</h2>
            <hr />
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={
                    formik.touched.firstName && formik.errors.firstName
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <small className="text-danger">{formik.errors.firstName}</small>
                ) : null}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={
                    formik.touched.lastName && formik.errors.lastName
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <small className="text-danger">{formik.errors.lastName}</small>
                ) : null}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={
                    formik.touched.email && formik.errors.email
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <small className="text-danger">{formik.errors.email}</small>
                ) : null}
              </div>

              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className={
                    formik.touched.username && formik.errors.username
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.username && formik.errors.username ? (
                  <small className="text-danger">{formik.errors.username}</small>
                ) : null}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={
                    formik.touched.password && formik.errors.password
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <small className="text-danger">{formik.errors.password}</small>
                ) : null}
              </div>

              <input
                type="submit"
                value="Register"
                className="btn btn-primary btn-block"
                disabled={!formik.isValid || formik.isSubmitting}
              />
            </form>
            <br />
            <p className="text-center">
              Already Registered? <Link to="/login">Click here</Link>
            </p>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

export default SignUp;
