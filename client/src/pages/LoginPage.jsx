import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full">
        {
          signinErrors.map((error, i) => (
            <div className="bg-red p-2 text-white my-2" key={i}>
              {error}
            </div>
          ))
        }
        <img src="/src/assets/corazon.svg"></img>
        <form
          onSubmit={onSubmit}
        >
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {
            errors.email && (<p className="text-red-500">Email is required</p>)
          }
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {
            errors.password && (<p className="text-red-500">Password is required</p>)
          }
          <button className="bg-blue px-4 py-1 rounded-sm" type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;