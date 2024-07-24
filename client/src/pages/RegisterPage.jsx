import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

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
          <div className="bg-red-600 text-white p-2 mb-4 rounded-md">
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
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mb-2">Username is required</p>
          )}
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-white px-4 py-2 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-2">Email is required</p>
          )}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-white px-4 py-2 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-4">Password is required</p>
          )}
          <button className="w-full bg-blue text-white px-4 py-2 rounded-md hover:bg-blue transition duration-300" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
