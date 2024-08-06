import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center bg-gray-100">
      <div className="bg-gray-800 max-w-md p-10 rounded-md shadow-lg w-full">
        <div className="flex justify-center mb-4">
          <img src="/src/assets/corazon.svg" alt={t('loginPage.logoAlt')} className="w-16 h-16" />
        </div>
        {signinErrors.length > 0 && (
          <div className="bg-red-600 text-white p-2 mb-4 rounded-md">
            {signinErrors.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </div>
        )}
        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-gray-700 px-4 py-2 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('loginPage.emailPlaceholder')}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-2">{t('loginPage.emailRequired')}</p>
          )}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-gray-700 px-4 py-2 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('loginPage.passwordPlaceholder')}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-4">{t('loginPage.passwordRequired')}</p>
          )}
          <button className="w-full bg-blue text-white px-4 py-2 rounded-md hover:bg-blue transition duration-300" type="submit">
            {t('loginPage.submitButton')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
