import { useState } from "react";
import axios from "axios";

export default function UploadDocuments() {

  const [files, setFiles] = useState({
    aadhaar: null,
    marksheet: null,
    income: null
  });

  const [status, setStatus] = useState({
    aadhaar: false,
    marksheet: false,
    income: false
  });

  const [preview, setPreview] = useState({
    aadhaar: "",
    marksheet: "",
    income: ""
  });

  // ✅ Upload file
  const uploadFile = async (type) => {
    if (!files[type]) {
      alert("Select file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", files[type]);
    formData.append("email", localStorage.getItem("email"));

    try {
      await axios.post("http://localhost:5000/api/apply", formData);

      setStatus({ ...status, [type]: true });

      // ✅ Preview
      const url = URL.createObjectURL(files[type]);
      setPreview({ ...preview, [type]: url });

    } catch {
      alert("Upload failed");
    }
  };

  // ✅ Forward
  const forwardApplication = async () => {
    await axios.post("http://localhost:5000/api/forward", {
      email: localStorage.getItem("email")
    });

    alert("Application Forwarded 🚀");
  };

  // ✅ Progress
  const completed = Object.values(status).filter(v => v).length;
  const percent = (completed / 3) * 100;

  const allSubmitted = completed === 3;

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h3 className="text-center mb-4 text-primary">
          Scholarship Document Upload Portal
        </h3>

        {/* 🔥 Progress Bar */}
        <div className="mb-4">
          <label>Progress: {completed}/3 Completed</label>
          <div className="progress">
            <div
              className="progress-bar"
              style={{ width: `${percent}%` }}
            >
              {percent}%
            </div>
          </div>
        </div>

        {/* 📄 Aadhaar */}
        <div className="mb-3">
          <label className="fw-bold">Aadhaar Card</label>
          <input
            type="file"
            className="form-control"
            disabled={status.aadhaar}
            onChange={e => setFiles({ ...files, aadhaar: e.target.files[0] })}
          />

          <button
            className="btn btn-success mt-2"
            disabled={status.aadhaar}
            onClick={() => uploadFile("aadhaar")}
          >
            Upload
          </button>

          {status.aadhaar && <span className="text-success ms-3">Submitted ✅</span>}

          {preview.aadhaar && (
            <div className="mt-2">
              <a href={preview.aadhaar} target="_blank" rel="noreferrer">
                Preview File
              </a>
            </div>
          )}
        </div>

        {/* 📄 Marksheet */}
        <div className="mb-3">
          <label className="fw-bold">Marksheet</label>
          <input
            type="file"
            className="form-control"
            disabled={status.marksheet}
            onChange={e => setFiles({ ...files, marksheet: e.target.files[0] })}
          />

          <button
            className="btn btn-success mt-2"
            disabled={status.marksheet}
            onClick={() => uploadFile("marksheet")}
          >
            Upload
          </button>

          {status.marksheet && <span className="text-success ms-3">Submitted ✅</span>}

          {preview.marksheet && (
            <div className="mt-2">
              <a href={preview.marksheet} target="_blank" rel="noreferrer">
                Preview File
              </a>
            </div>
          )}
        </div>

        {/* 📄 Income */}
        <div className="mb-3">
          <label className="fw-bold">Income Certificate</label>
          <input
            type="file"
            className="form-control"
            disabled={status.income}
            onChange={e => setFiles({ ...files, income: e.target.files[0] })}
          />

          <button
            className="btn btn-success mt-2"
            disabled={status.income}
            onClick={() => uploadFile("income")}
          >
            Upload
          </button>

          {status.income && <span className="text-success ms-3">Submitted ✅</span>}

          {preview.income && (
            <div className="mt-2">
              <a href={preview.income} target="_blank" rel="noreferrer">
                Preview File
              </a>
            </div>
          )}
        </div>

        {/* 🚀 FINAL BUTTON */}
        {allSubmitted && (
          <div className="text-center mt-4">
            <button
              className="btn btn-primary px-4"
              onClick={forwardApplication}
            >
              Forward for Final Submission
            </button>
          </div>
        )}
      </div>
    </div>
  );
}