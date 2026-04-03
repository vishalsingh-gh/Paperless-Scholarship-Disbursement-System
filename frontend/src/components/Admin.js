import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [apps, setApps] = useState([]);

  // ✅ fetch applications
  const fetchApps = () => {
    axios.get("http://localhost:5000/api/applications")
      .then(res => setApps(res.data));
  };

  useEffect(() => {
    fetchApps();
  }, []);

  // ✅ approve function
  const approve = async (id) => {
    await axios.post(`http://localhost:5000/api/approve/${id}`);
    alert("Approved");
    fetchApps(); // 🔥 refresh data
  };

  // ✅ reject function
  const reject = async (id) => {
    await axios.post(`http://localhost:5000/api/reject/${id}`);
    alert("Rejected");
    fetchApps(); // 🔥 refresh data
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Dashboard</h2>

      <table className="table table-bordered shadow text-center">
        <thead className="table-dark">
          <tr>
            <th>Email</th>
            <th>Document</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {apps.map(app => (
            <tr key={app._id}>
              <td>{app.email}</td>
              <td>
  <a
    href={`http://localhost:5000/uploads/${app.document}`}
    target="_blank"
    rel="noreferrer"
    className="btn btn-primary btn-sm"
  >
    View File
  </a>
</td>

              {/* ✅ status color */}
              <td>
                <span className={
                  app.status === "Approved"
                    ? "text-success fw-bold"
                    : app.status === "Rejected"
                    ? "text-danger fw-bold"
                    : "text-warning fw-bold"
                }>
                  {app.status}
                </span>
              </td>

              <td>
                <button
                  className="btn btn-success me-2"
                  onClick={() => approve(app._id)}
                >
                  Approve
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => reject(app._id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}