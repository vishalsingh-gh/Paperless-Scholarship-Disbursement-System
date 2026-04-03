import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "student"
  });

  const navigate = useNavigate();

  const register = async () => {
    await axios.post("http://localhost:5000/register", data);
    alert("Registered Successfully");
    navigate("/");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-success">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Register</h3>

        <input className="form-control mb-3"
          placeholder="Email"
          onChange={e => setData({...data, email:e.target.value})}
        />

        <input className="form-control mb-3"
          type="password"
          placeholder="Password"
          onChange={e => setData({...data, password:e.target.value})}
        />

        <select className="form-control mb-3"
          onChange={e => setData({...data, role:e.target.value})}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <button className="btn btn-success w-100" onClick={register}>
          Register
        </button>
      </div>
    </div>
  );
}