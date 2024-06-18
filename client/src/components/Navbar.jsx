import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { isAuthenticated } = useAuth();

    return (
        <nav className="bg-gray-dark my-3 flex justify-between py-5 px-10">
            <Link to="/home"><h1 className="text-2xl font-bold text-gray-light">
                Home
            </h1></Link>
            <ul className="flex gap-x-2 text-gray-light">
                {isAuthenticated ? (
                    <>
                        <li>
                            Welcome User
                        </li>
                        <li>
                            <Link to="/add-task">
                                Add Task
                            </Link>
                        </li>
                        <li>
                            <Link to="/logout">
                                Logout
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="login">
                            </Link>
                        </li>
                        <li>
                            <Link to="register">
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