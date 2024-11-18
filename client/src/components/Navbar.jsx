import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaUserMd,
  FaClipboardList,
  FaCalendarAlt,
  FaUser,
  FaNotesMedical,
  FaChartBar,
  FaPrescriptionBottle,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaCaretDown,
} from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [showMedicalRecordsMenu, setShowMedicalRecordsMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { t } = useTranslation();

  const toggleMedicalRecordsMenu = () => {
    setShowMedicalRecordsMenu(!showMedicalRecordsMenu);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <nav className="bg-blue-700 shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Título a la izquierda */}
        <div className="flex items-center">
          <Link to={isAuthenticated ? "/tasks" : "/"} className="text-white text-2xl font-semibold">
            {t('navbar.headerTitle')}
          </Link>
        </div>

        {/* Navegación / Botones a la derecha */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <li>
                <Link
                  to="/add-task"
                  className="flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-800 transition"
                >
                  <MdAssignment className="mr-2" /> {t('navbar.addTask')}
                </Link>
              </li>
              <li>
                <Link
                  to="/calendar"
                  className="flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-800 transition"
                >
                  <FaCalendarAlt className="mr-2" /> {t('navbar.calendar')}
                </Link>
              </li>
              <li className="relative">
                <button
                  onClick={toggleMedicalRecordsMenu}
                  className="flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-800 transition"
                >
                  <FaNotesMedical className="mr-2" /> {t('navbar.medicalRecords')}{" "}
                  <FaCaretDown className="ml-1" />
                </button>
                {showMedicalRecordsMenu && (
                  <ul className="absolute left-0 top-full mt-2 bg-blue-600 rounded-md shadow-lg w-48">
                    <li>
                      <Link
                        to="/records"
                        className="block px-4 py-2 text-white hover:bg-blue-500 rounded-t-md transition"
                      >
                        {t('navbar.viewRecords')}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/add-records"
                        className="block px-4 py-2 text-white hover:bg-blue-500 rounded-b-md transition"
                      >
                        <FaClipboardList className="mr-2" /> {t('navbar.addMedicalRecords')}
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <img
                  src={user.avatar || "https://via.placeholder.com/50"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
                  onClick={toggleProfileMenu}
                />
                {showProfileMenu && (
                  <ul className="absolute right-0 top-full mt-2 bg-blue-600 rounded-md shadow-lg w-40">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-white hover:bg-blue-500 rounded-t-md transition"
                      >
                        <FaUser className="mr-2" /> {t('navbar.profile')}
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => logout()}
                        className="block w-full text-left px-4 py-2 text-white hover:bg-blue-500 rounded-b-md transition"
                      >
                        <FaSignOutAlt className="mr-2" /> {t('navbar.logout')}
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-800 transition"
              >
                <FaSignInAlt className="mr-2" /> {t('navbar.login')}
              </Link>
              <Link
                to="/register"
                className="flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-800 transition"
              >
                <FaUserPlus className="mr-2" /> {t('navbar.register')}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
