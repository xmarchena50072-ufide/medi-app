import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signup, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate("/tasks")
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (values) => {
        signup(values);
    })

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md p-10 rounded-md">
                <img src="/src/assets/corazon.svg"></img>
                {
                    registerErrors.map((error, i) => (
                        <div className="bg-red" key={i}>
                            {error}
                        </div>
                    ))
                }
                <form
                    onSubmit={onSubmit}
                >
                    <input
                        type="text"
                        {...register("username", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Username"
                    />
                    {
                        errors.username && (<p className="text-red-500">Username is required</p>)
                    }
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
                    <button className="bg-blue rounded" type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage