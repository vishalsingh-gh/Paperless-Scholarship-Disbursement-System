import StudentProfile from "./StudentProfile";
import UploadDocuments from "./UploadDocuments";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Student from "./components/Student";
import Admin from "./components/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student" element={<Student />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<StudentProfile />} />
<Route path="/upload" element={<UploadDocuments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;