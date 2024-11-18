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
      <div className="bg-white max-w-md p-8 rounded-md shadow-xl w-full">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/src/assets/corazon.svg" alt={t('loginPage.logoAlt')} className="w-16 h-16" />
        </div>

        {/* Sign-in Errors */}
        {signinErrors.length > 0 && (
          <div className="bg-red-100 text-red-700 p-3 mb-6 rounded-md border border-red-400">
            {signinErrors.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </div>
        )}

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t('loginPage.emailPlaceholder')}
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: true })}
              className="w-full bg-gray-50 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('loginPage.emailPlaceholder')}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{t('loginPage.emailRequired')}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              {t('loginPage.passwordPlaceholder')}
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: true })}
              className="w-full bg-gray-50 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('loginPage.passwordPlaceholder')}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{t('loginPage.passwordRequired')}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {t('loginPage.submitButton')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
