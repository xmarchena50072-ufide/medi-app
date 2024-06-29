import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { isAuthenticated, logout, user } = useAuth();

    return (
        <nav className="bg-gray-dark my-3 flex justify-between py-5 px-10">
            <Link to={isAuthenticated ? "/tasks" : "/"}><h1 className="text-2xl font-bold text-gray-light">
                Medi-App
            </h1></Link>
            <ul className="flex gap-x-2 text-gray-light">
                {isAuthenticated ? (
                    <>
                        <li>
                            Welcome {user.username}
                        </li>
                        <li>
                            <Link to="/add-task" className="bg-blue px-4 py-1 rounded-sm">
                                Add Task
                            </Link>
                        </li>
                        <li>
                            <Link to="/add-records" className="bg-blue px-4 py-1 rounded-sm">
                                Add Medical Records
                            </Link>
                        </li>
                        <li>
                            <Link to="/calendar" className="bg-blue px-4 py-1 rounded-sm">
                                Calendar
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile" className="bg-blue px-4 py-1 rounded-sm">
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link to="/records" className="bg-blue px-4 py-1 rounded-sm">
                                Medical Records
                            </Link>
                        </li>
                        <li>
                            <Link to="/reports" className="bg-blue px-4 py-1 rounded-sm">
                                Reports
                            </Link>
                        </li>
                        <li>
                            <Link to="/logout" onClick={() => {
                                logout();
                            }}>
                                Logout
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login" className="bg-blue px-4 py-1 rounded-sm">
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/register" className="bg-blue px-4 py-1 rounded-sm">
                                Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar