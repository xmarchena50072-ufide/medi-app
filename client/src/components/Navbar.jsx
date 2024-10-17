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
    <nav className="bg-gray-dark my-3 flex justify-between py-5 px-10">
      <ul className="flex gap-x-2 text-gray-light relative">
        <Link to={isAuthenticated ? "/tasks" : "/"}>
          <h1 className="text-2xl font-bold text-gray-light">{t('navbar.headerTitle')}</h1>
        </Link>
        {isAuthenticated ? (
          <>
            <li className="bg-blue px-4 py-2 rounded-md flex items-center">
              <Link to="/add-task" className="w-full h-full flex items-center justify-center">
                <MdAssignment className="mr-2" /> {t('navbar.addTask')}
              </Link>
            </li>
            <li className="bg-blue px-4 py-2 rounded-md flex items-center">
              <Link to="/calendar" className="w-full h-full flex items-center justify-center">
                <FaCalendarAlt className="mr-2" /> {t('navbar.calendar')}
              </Link>
            </li>
            <li className="bg-blue px-4 py-2 rounded-md flex items-center relative">
              <button onClick={toggleMedicalRecordsMenu} className="flex items-center">
                <FaNotesMedical className="mr-2" /> {t('navbar.medicalRecords')} <FaCaretDown className="ml-1" />
              </button>
              {showMedicalRecordsMenu && (
                <ul className="absolute left-0 top-full mt-2 bg-gray-dark rounded-md shadow-lg">
                  <li className="px-4 py-2 hover:bg-blue rounded-t-md">
                    <Link to="/records" className="w-full h-full flex items-center justify-center">
                      {t('navbar.viewRecords')}
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-blue rounded-b-md">
                    <Link to="/add-records" className="w-full h-full flex items-center justify-center">
                      <FaClipboardList className="mr-2" /> {t('navbar.addMedicalRecords')}
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="bg-blue px-4 py-2 rounded-md flex items-center">
              <Link to="/reports" className="w-full h-full flex items-center justify-center">
                <FaChartBar className="mr-2" /> {t('navbar.reports')}
              </Link>
            </li>
            <li className="bg-blue px-4 py-2 rounded-md flex items-center">
              <Link to="/users" className="w-full h-full flex items-center justify-center">
                <FaChartBar className="mr-2" /> {t('navbar.users')}
              </Link>
            </li>
            <li className="bg-blue px-4 py-2 rounded-md flex items-center">
              <Link to="/add-prescription" className="w-full h-full flex items-center justify-center">
                <FaPrescriptionBottle className="mr-2" /> {t('navbar.addPrescription')}
              </Link>
            </li>
            <div className="flex items-center">
              {isAuthenticated && (
                <div className="relative flex items-center">
                  <img
                    src={user.avatar || "https://img.freepik.com/premium-vector/people-avatar-character-vector-icon-human-avatar-profile-business-illustration_196200-1364.jpg?w=740"} // Asegúrate de que user.avatar contenga la URL del avatar del usuario
                    alt="User Avatar"
                    className="w-16 h-16 rounded-full cursor-pointer"
                    onClick={toggleProfileMenu}
                  />
                  {showProfileMenu && (
                    <ul className="absolute left-0 top-full mt-2 bg-gray-dark rounded-md shadow-lg">
                      <li className="px-4 py-2 hover:bg-blue rounded-t-md">
                        <Link to="/profile" className="w-full h-full flex items-center justify-center">
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
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <li className="bg-blue px-4 py-2 rounded-md flex items-center">
              <Link to="/login" className="w-full h-full flex items-center justify-center">
                <FaSignInAlt className="mr-2" /> {t('navbar.login')}
              </Link>
            </li>
            <li className="bg-blue px-4 py-2 rounded-md flex items-center">
              <Link to="/register" className="w-full h-full flex items-center justify-center">
                <FaUserPlus className="mr-2" /> {t('navbar.register')}
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
