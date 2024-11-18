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
      <div className="bg-white max-w-md p-8 rounded-md shadow-xl w-full">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/src/assets/corazon.svg" alt="Medi-App Logo" className="w-16 h-16" />
        </div>

        {/* Registro de errores */}
        {registerErrors.length > 0 && (
          <div className="bg-red-100 text-red-700 p-3 mb-6 rounded-md border border-red-400">
            {registerErrors.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Nombre de usuario */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              {t('registerPage.usernamePlaceholder')}
            </label>
            <input
              id="username"
              type="text"
              {...register("username", { required: true })}
              className="w-full bg-gray-50 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('registerPage.usernamePlaceholder')}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{t('registerPage.usernameRequired')}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t('registerPage.emailPlaceholder')}
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: true })}
              className="w-full bg-gray-50 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('registerPage.emailPlaceholder')}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{t('registerPage.emailRequired')}</p>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              {t('registerPage.passwordPlaceholder')}
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: true })}
              className="w-full bg-gray-50 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('registerPage.passwordPlaceholder')}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{t('registerPage.passwordRequired')}</p>
            )}
          </div>

          {/* Rol */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              {t('registerPage.rolePlaceholder')}
            </label>
            <input
              id="role"
              type="text"
              {...register("role", { required: true })}
              className="w-full bg-gray-50 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('registerPage.rolePlaceholder')}
            />
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{t('registerPage.roleRequired')}</p>
            )}
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full bg-blue text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {t('registerPage.registerButton')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
