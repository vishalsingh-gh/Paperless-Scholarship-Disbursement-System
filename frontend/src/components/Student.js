import { useState } from "react";
import axios from "axios";

export default function Student() {
  const [file, setFile] = useState(null);

  const submit = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", localStorage.getItem("email"));

    await axios.post("http://localhost:5000/api/apply", formData);

    alert("Application Submitted");
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Student Dashboard</h2>

      <div className="card p-4 shadow">
        <input type="file"
          className="form-control mb-3"
          onChange={e => setFile(e.target.files[0])}
        />

        <button className="btn btn-primary" onClick={submit}>
          Submit Document
        </button>
      </div>
    </div>
  );
}