import { useState } from "react";

import axios from "axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  toast,
  ToastContainer,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Login() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {

    if (
      !email ||
      !password
    ) {

      toast.warning(
        "Please fill all fields"
      );

      return;
    }

    try {

      setLoading(true);

      const res =
        await axios.post(
          "http://localhost:5001/api/auth/login",
          {
            email,
            password,
          }
        );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          res.data.user
        )
      );

      toast.success(
        "Login Successful"
      );

      setTimeout(() => {

        navigate(
          "/dashboard"
        );

      }, 1500);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="auth-container">

      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
      />

      <div className="auth-box">

        <h1>Login</h1>

        <input
          type="email"
          placeholder="Email"

          value={email}

          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          type="password"
          placeholder="Password"

          value={password}

          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          onClick={handleLogin}
          disabled={loading}
        >

          {
            loading
              ? "Logging in..."
              : "Login"
          }

        </button>

        <div className="auth-link">

          Don't have an account?

          <br />

          <Link to="/signup">
            Signup Here
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;

