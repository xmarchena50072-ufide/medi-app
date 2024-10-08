import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center bg-gray-100">
      <div className="bg-gray-800 max-w-md p-10 rounded-md shadow-lg">
        <div className="flex justify-center mb-4">
          <img src="/src/assets/corazon.svg" alt="Medi-App Logo" className="w-16 h-16"/>
        </div>
        {registerErrors.length > 0 && (
          <div className="bg-red text-white p-2 mb-4 rounded-md">
            {registerErrors.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </div>
        )}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-white px-4 py-2 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('registerPage.usernamePlaceholder')}
          />
          {errors.username && (
            <p className="text-red text-sm mb-2">{t('registerPage.usernameRequired')}</p>
          )}
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-white px-4 py-2 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('registerPage.emailPlaceholder')}
          />
          {errors.email && (
            <p className="text-red text-sm mb-2">{t('registerPage.emailRequired')}</p>
          )}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-white px-4 py-2 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('registerPage.passwordPlaceholder')}
          />
          {errors.password && (
            <p className="text-red text-sm mb-4">{t('registerPage.passwordRequired')}</p>
          )}
          <button className="w-full bg-blue text-white px-4 py-2 rounded-md hover:bg-blue transition duration-300" type="submit">
            {t('registerPage.registerButton')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
