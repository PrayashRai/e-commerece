import { Link } from "react-router-dom";

const LoginDropdown = () => {
    return(
        <div className="dropdown-content">
        <Link to="/login" className="btn btn-outline-primary">Login</Link>
        <Link to="/signup" className="btn btn-outline-secondary">Sign Up</Link>
      </div>
    )
}

export default LoginDropdown;