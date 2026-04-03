import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function StudentProfile() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    college: ""
  });

  const navigate = useNavigate();

  const submitProfile = async () => {
    await axios.post("http://localhost:5000/api/profile", {
      ...form,
      email: localStorage.getItem("email")
    });

    alert("Profile Saved");
    navigate("/upload"); // go to upload page
  };

  return (
    <div className="container mt-5">
      <h3>Student Details</h3>

      <input className="form-control mb-2" placeholder="Name"
        onChange={e => setForm({...form, name:e.target.value})} />

      <input className="form-control mb-2" placeholder="Phone"
        onChange={e => setForm({...form, phone:e.target.value})} />

      <input className="form-control mb-2" placeholder="Address"
        onChange={e => setForm({...form, address:e.target.value})} />

      <input className="form-control mb-2" placeholder="College"
        onChange={e => setForm({...form, college:e.target.value})} />

      <button className="btn btn-primary" onClick={submitProfile}>
        Save & Next
      </button>
    </div>
  );
}