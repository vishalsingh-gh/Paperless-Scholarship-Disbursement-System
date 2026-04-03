import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/auth/login", data);

      localStorage.setItem("email", res.data.email);
      localStorage.setItem("role", res.data.role);

      // ✅ ROLE BASED NAVIGATION
      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/profile"); // 🔥 CHANGE HERE
      }

    } catch {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-primary">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Login</h3>

        <input className="form-control mb-3"
          placeholder="Email"
          onChange={e => setData({...data, email:e.target.value})}
        />

        <input className="form-control mb-3"
          type="password"
          placeholder="Password"
          onChange={e => setData({...data, password:e.target.value})}
        />

        <button className="btn btn-dark w-100" onClick={login}>
          Login
        </button>

        <p className="text-center mt-3 text-primary"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/register")}>
          New user? Register
        </p>
      </div>
    </div>
  );
}