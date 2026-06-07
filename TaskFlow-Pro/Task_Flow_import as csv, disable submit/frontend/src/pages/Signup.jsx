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

function Signup() {

  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSignup = async () => {

    if (
      !name ||
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

      await axios.post(
        "http://localhost:5001/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      toast.success(
        "Account Created"
      );

      setTimeout(() => {

        navigate("/");

      }, 1500);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Signup Failed"
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

        <h1>Signup</h1>

        <input
          type="text"
          placeholder="Name"

          value={name}

          onChange={(e) =>
            setName(
              e.target.value
            )
          }
        />

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
          onClick={handleSignup}
          disabled={loading}
        >

          {
            loading
              ? "Creating..."
              : "Signup"
          }

        </button>

        <div className="auth-link">

          Already have an account?

          <br />

          <Link to="/">
            Login Here
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Signup;

