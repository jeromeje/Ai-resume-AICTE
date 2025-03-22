import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Jobs from "./pages/Jobs";
import ApplyJob from "./pages/ApplyJobs";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddJob from "./pages/AddJob";
import JobDetails from "./pages/JobDetails";
import AdminNav from "./pages/adminnav";

import Candidate from "./pages/CandidateDashboard";
import CandidateInfo from "./pages/Candidateinfo";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:jobId/apply" element={<ApplyJob />} />


                {/* //AdminDashboard */}
                {/* <Route path="/admin" element={<AdminDashboard />} /> */}
                <Route path="/admin" element={<AdminLogin />} />
               <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/add-job" element={<AddJob />} />
              <Route path="/job/:id" element={<JobDetails />} />
              <Route path="/adminnav" element={<AdminNav />} />

                <Route path="/candidate" element={<Candidate />} />
                <Route path="/user-info" element={<CandidateInfo />} />
                
            </Routes>
        </Router>
    );
}

export default App;
