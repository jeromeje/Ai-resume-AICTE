import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand" to="/">Resume Screening</Link>
                <div>
                    <Link className="btn btn-light me-2" to="/login">Login</Link>
                    <Link className="btn btn-light" to="/admin">Admin</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
