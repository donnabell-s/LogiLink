import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../../services/authService";
import "./SideBar.css";

export const SideBar = () => {
    const navigate = useNavigate(); // Hook to programmatically navigate

    const handleLogout = () => {
        logoutUser (); // Call the logout function
        navigate("/login"); // Redirect to the login page after logout
    };

    return (
        // <div className="d-flex flex-column h-100 sidebar">
        //     <div className="ps-3 mb-4">
        //         <img src="/images/sidebar-logo.svg" alt="Logo" /> {/* Replace with your logo path */}
        //     </div>
        //     <div className="d-flex flex-column sidebar-links mt-5">
        //         <Link to="/dashboard" className="d-flex align-items-center" style={{ backgroundColor: location.pathname === "/dashboard" ? "rgba(81, 205, 190, 0.25)" : "transparent" }}>
        //             <img src="/icons/grid.svg" alt="Dashboard Icon" className="icon" />
        //             Dashboard
        //         </Link>
        //         <Link to="/audit-log" className="d-flex align-items-center" style={{ backgroundColor: location.pathname === "/audit-log" ? "rgba(81, 205, 190, 0.25)" : "transparent" }}>
        //             <img src="/icons/list.svg" alt="AuditLog Icon" className="icon" />
        //             Audit Log
        //         </Link>
        //     </div>
        //     <div className="d-flex flex-column sidebar-links mt-auto">
        //         <Link to="/" className="d-flex align-items-center">
        //             <img src="/icons/settings.svg" alt="Settings Icon" className="icon" />
        //             <span>Settings</span>
        //         </Link>
        //         <Link to="/" className="d-flex align-items-center">
        //             <img src="/icons/help-circle.svg" alt="Help Center Icon" className="icon" />
        //             Help Center
        //         </Link>
        //         <a onClick={handleLogout} className="d-flex align-items-center">
        //             <img src="/icons/log-out.svg" alt="Logout Icon" className="icon" />
        //             Logout
        //         </a>
        //     </div>
        // </div>

        <div className="d-flex flex-column h-100 sidebar">
        <div className="ps-3 mb-4">
            <img src="/images/sidebar-logo.svg" alt="Logo" /> {/* Replace with your logo path */}
        </div>
        <div className="d-flex flex-column sidebar-links mt-5 gap-1">
            <Link 
                to="/dashboard" 
                className={`d-flex align-items-center ${location.pathname === "/dashboard" ? "active-link" : ""}`} // Add active class
            >
                <img src="/icons/grid.svg" alt="Dashboard Icon" className="icon" />
                Dashboard
            </Link>
            <Link 
                to="/audit-log" 
                className={`d-flex align-items-center ${location.pathname === "/audit-log" ? "active-link" : ""}`} // Add active class
            >
                <img src="/icons/list.svg" alt="Audit Log Icon" className="icon" />
                Audit Log
            </Link>
        </div>
        <div className="d-flex flex-column sidebar-links mt-auto gap-1">
            <Link to="/" className="d-flex align-items-center">
                <img src="/icons/settings.svg" alt="Settings Icon" className="icon" />
                <span>Settings</span>
            </Link>
            <Link to="/" className="d-flex align-items-center">
                <img src="/icons/help-circle.svg" alt="Help Center Icon" className="icon" />
                Help Center
            </Link>
            <a onClick={handleLogout} className="d-flex align-items-center">
                <img src="/icons/log-out.svg" alt="Logout Icon" className="icon" />
                Logout
            </a>
        </div>
    </div>
    );
}