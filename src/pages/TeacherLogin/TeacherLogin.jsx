import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const TeacherLogin = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    const values = {
      mail: emailRef.current.value.toLowerCase().trim().trimStart(),
      password: passwordRef.current.value.trim().trimStart(),
    };
    event.preventDefault();

    try {
      const response = await axios.post('/users/login', values);
      console.log(response);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('mail', response.data.user.mail);
      navigate("../videochat");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "300px", margin: "0 auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Login</h2>
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          ref={emailRef}
          style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          required
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="password" style={{ display: "block", marginBottom: "5px" }}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          ref={passwordRef}
          style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          required
        />
      </div>
      <button type="submit" style={{ padding: "10px 15px", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
        Login
      </button>
    </form>
  );
};

export default TeacherLogin;
