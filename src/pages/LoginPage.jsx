import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Endpoints from "../api/Endpoints";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [requestResponse, setRequestResponse] = useState({
    textMessage: "",
    alertClass: "",
  });

  // Get success message from location state if it exists
  useEffect(() => {
    if (location.state?.successMessage) {
      setRequestResponse({
        textMessage: location.state.successMessage,
        alertClass: "alert alert-success",
      });
    }
  }, [location.state]);

  const initialvalues = {
    username: "mor_2314",
    password: "83r5^_",
  };

  const onSubmit = (values) => {
    axios
      .post(Endpoints.LOGIN_URL, values)
      .then((response) => {
        console.log(response.data);
        setRequestResponse({
          textMessage: "Login Successful",
          alertClass: "alert alert-success",
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/');
      })
      .catch((error) => {
        setRequestResponse({
          textMessage: error.response?.data?.message || "Invalid Username or Password",
          alertClass: "alert alert-danger",
        });
      });
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
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
            <h2>Login</h2>
            <hr />
            <Formik
              initialValues={initialvalues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              validateOnMount
            >
              {(formik) => (
                <Form>
                  <div className="form-group">
                    <label>Username</label>
                    <Field
                      type="text"
                      name="username"
                      className={
                        formik.touched.username && formik.errors.username
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    />
                    <ErrorMessage name="username">
                      {(errorMessage) => (
                        <small className="text-danger">{errorMessage}</small>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <Field
                      type="password"
                      name="password"
                      className={
                        formik.touched.password && formik.errors.password
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    />
                    <ErrorMessage name="password">
                      {(errorMessage) => (
                        <small className="text-danger">{errorMessage}</small>
                      )}
                    </ErrorMessage>
                  </div>

                  <Field
                    type="submit"
                    value="Login"
                    disabled={!formik.isValid}
                    className="btn btn-primary btn-block"
                  />
                </Form>
              )}
            </Formik>
            <br />
            <p className="text-center">
              New User? <Link to="/signUp">Click Here</Link>
            </p>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

export default LoginPage;
