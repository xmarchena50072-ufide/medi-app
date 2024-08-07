import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Importar i18n

function ProfilePage() {
  const { user, getProfile, loading } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { t } = useTranslation(); // Utilizar i18n para traducción

  useEffect(() => {
    getProfile();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Implement the logic to upload the file and update the profile image
      console.log("Selected file:", file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  if (loading) {
    return <div>{t('profilePage.loading')}</div>;
  }

  if (!user) {
    return <div>{t('profilePage.userNotFound')}</div>;
  }

  return (
    <div className="p-6 bg-gray-dark min-h-screen flex flex-col items-center">
      <div className="bg-gray max-w-md w-full p-10 rounded-md text-white flex flex-col items-center">
        <div className="w-24 h-24 bg-gray-light rounded-full mb-4 flex items-center justify-center text-4xl text-gray-dark">
          {/* Placeholder Avatar Icon */}
          {user.username.charAt(0).toUpperCase()}
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleFileChange} 
        />
        <button 
          onClick={handleUploadClick}
          className="bg-blue text-white px-4 py-2 rounded-md mt-4 mb-6"
        >
          {t('profilePage.uploadProfilePhoto')}
        </button>
        <h1 className="text-3xl font-bold mb-4">{t('profilePage.profile')}</h1>
        <div className="mb-2 w-full">
          <strong>{t('profilePage.username')}:</strong> {user.username}
        </div>
        <div className="mb-2 w-full">
          <strong>{t('profilePage.email')}:</strong> {user.email}
        </div>
        <div className="mb-2 w-full">
          <strong>{t('profilePage.createdAt')}:</strong> {new Date(user.createdAt).toLocaleString()}
        </div>
        <div className="mb-2 w-full">
          <strong>{t('profilePage.updatedAt')}:</strong> {new Date(user.updatedAt).toLocaleString()}
        </div>
        <Link 
          to={`/profile/${user.id}`}
          className="bg-blue text-white px-4 py-2 rounded-md mt-4 w-full"
        >
          {t('profilePage.editProfile')}
        </Link>
      </div>
    </div>
  );
}

export default ProfilePage;
