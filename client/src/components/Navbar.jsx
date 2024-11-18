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

  const { t, i18n: { changeLanguage, language } } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language);

  const toggleMedicalRecordsMenu = () => {
    setShowMedicalRecordsMenu(!showMedicalRecordsMenu);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <nav className="bg-gray-dark py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Título */}
        <Link to={isAuthenticated ? "/tasks" : "/"} className="text-gray-light text-2xl font-bold">
          {t('navbar.headerTitle')}
        </Link>

        {/* Navegación */}
        {isAuthenticated ? (
          <ul className="flex items-center space-x-4">
            <li>
              <Link to="/add-task" className="flex items-center px-4 py-2 bg-blue rounded-md text-white hover:bg-blue-600 transition">
                <MdAssignment className="mr-2" /> {t('navbar.addTask')}
              </Link>
            </li>
            <li>
              <Link to="/calendar" className="flex items-center px-4 py-2 bg-blue rounded-md text-white hover:bg-blue-600 transition">
                <FaCalendarAlt className="mr-2" /> {t('navbar.calendar')}
              </Link>
            </li>
            <li className="relative">
              <button onClick={toggleMedicalRecordsMenu} className="flex items-center px-4 py-2 bg-blue rounded-md text-white hover:bg-blue-600 transition">
                <FaNotesMedical className="mr-2" /> {t('navbar.medicalRecords')} <FaCaretDown className="ml-1" />
              </button>
              {showMedicalRecordsMenu && (
                <ul className="absolute mt-2 bg-gray-dark rounded-md shadow-lg w-48">
                  <li>
                    <Link to="/records" className="block px-4 py-2 text-gray-light hover:bg-blue rounded-t-md transition">
                      {t('navbar.viewRecords')}
                    </Link>
                  </li>
                  <li>
                    <Link to="/add-records" className="block px-4 py-2 text-gray-light hover:bg-blue rounded-b-md transition">
                      <FaClipboardList className="mr-2" /> {t('navbar.addMedicalRecords')}
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link to="/reports" className="flex items-center px-4 py-2 bg-blue rounded-md text-white hover:bg-blue-600 transition">
                <FaChartBar className="mr-2" /> {t('navbar.reports')}
              </Link>
            </li>
            <li>
              <Link to="/users" className="flex items-center px-4 py-2 bg-blue rounded-md text-white hover:bg-blue-600 transition">
                <FaUser className="mr-2" /> {t('navbar.users')}
              </Link>
            </li>
            <li>
              <Link to="/add-prescription" className="flex items-center px-4 py-2 bg-blue rounded-md text-white hover:bg-blue-600 transition">
                <FaPrescriptionBottle className="mr-2" /> {t('navbar.addPrescription')}
              </Link>
            </li>
            {/* Avatar y menú de perfil */}
            <li className="relative">
              <img
                src={user.avatar || "https://img.freepik.com/premium-vector/people-avatar-character-vector-icon-human-avatar-profile-business-illustration_196200-1364.jpg?w=740"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={toggleProfileMenu}
              />
              {showProfileMenu && (
                <ul className="absolute right-0 mt-2 bg-gray-dark rounded-md shadow-lg w-40">
                  <li>
                    <Link to="/profile" className="block px-4 py-2 text-gray-light hover:bg-blue rounded-t-md transition">
                      <FaUser className="mr-2" /> {t('navbar.profile')}
                    </Link>
                  </li>
                  <li className="bg-gray px-4 py-2 rounded-md flex items-center">
                    <Link to="/" onClick={() => { logout(); }} className="w-full h-full flex items-center justify-center">
                      <FaSignOutAlt className="mr-2" /> {t('navbar.logout')}
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        ) : (
          <ul className="flex items-center space-x-4">
            <li>
              <Link to="/login" className="flex items-center px-4 py-2 bg-blue rounded-md text-white hover:bg-blue-600 transition">
                <FaSignInAlt className="mr-2" /> {t('navbar.login')}
              </Link>
            </li>
            <li>
              <Link to="/register" className="flex items-center px-4 py-2 bg-blue rounded-md text-white hover:bg-blue-600 transition">
                <FaUserPlus className="mr-2" /> {t('navbar.register')}
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

