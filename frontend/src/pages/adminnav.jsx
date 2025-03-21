import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import AddJob from "./AddJob";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">ResumeRank Admin</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Admin Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-job">Add Job</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container py-4">
          <Routes>
      <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/add-job" element={<AddJob />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
