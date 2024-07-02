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
            <li className="bg-gray px-4 py-2 rounded-md flex items-center">
              Welcome {user.username}
            </li>
            <li className="bg-blue px-4 py-2 rounded-md flex items-center">
              <Link to="/add-task" className="w-full h-full flex items-center justify-center">
                Add Task
              </Link>
            </li>
            <li className="bg-blue px-4 py-2 rounded-md flex items-center">
              <Link to="/add-records" className="w-full h-full flex items-center justify-center">
                Add Medical Records
              </Link>
            </li>
            <li className="bg-blue px-4 py-2 rounded-md flex items-center">
              <Link to="/calendar" className="w-full h-full flex items-center justify-center">
                Calendar
              </Link>
            </li>
            <li className="bg-blue px-4 py-2 rounded-md flex items-center">
              <Link to="/profile" className="w-full h-full flex items-center justify-center">
                Profile
              </Link>
            </li>
            <li className="bg-blue px-4 py-2 rounded-md flex items-center">
              <Link to="/records" className="w-full h-full flex items-center justify-center">
                Medical Records
              </Link>
            </li>
            <li className="bg-blue px-4 py-2 rounded-md flex items-center">
              <Link to="/reports" className="w-full h-full flex items-center justify-center">
                Reports
              </Link>
            </li>
            <li className="bg-blue px-4 py-2 rounded-md flex items-center">
              <Link to="/add-prescription" className="w-full h-full flex items-center justify-center">
                Add Prescription
              </Link>
            </li>
            <li className="bg-blue px-4 py-2 rounded-md flex items-center">
              <Link to="/medical-opinion" className="w-full h-full flex items-center justify-center">
                Medical Opinion
              </Link>
            </li>
            <li className="bg-gray px-4 py-2 rounded-md flex items-center">
              <Link to="/" onClick={() => {
                logout();
              }} className="w-full h-full flex items-center justify-center">
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="bg-blue px-4 py-2 rounded-md flex items-center">
              <Link to="/login" className="w-full h-full flex items-center justify-center">
                Login
              </Link>
            </li>
            <li className="bg-blue px-4 py-2 rounded-md flex items-center">
              <Link to="/register" className="w-full h-full flex items-center justify-center">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
