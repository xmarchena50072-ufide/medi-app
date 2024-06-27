import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ProfileFormPage() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { user, getProfile, updateProfile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (user) {
      setValue("username", user.username);
      setValue("email", user.email);
      setValue("createdAt", user.createdAt);
      setValue("updatedAt", user.updatedAt);
    }
  }, [user]);

  const onSubmit = handleSubmit((data) => {
    const updatedData = {
      username: data.username,
      email: data.email,
    };
    updateProfile(updatedData);
    navigate("/profile");
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-gray-dark max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <label htmlFor="username" className="block text-white text-sm font-bold mb-2">Username</label>
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
            autoFocus
          />
          {errors.username && (<p className="text-red mb-2">Username is required</p>)}

          <label htmlFor="email" className="block text-white text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
          />
          {errors.email && (<p className="text-red mb-2">Email is required</p>)}

          <label htmlFor="createdAt" className="block text-white text-sm font-bold mb-2">Created At</label>
          <input
            type="text"
            readOnly
            {...register("createdAt")}
            className="w-full bg-gray-200 text-gray-dark px-4 py-2 rounded-md mb-2"
          />

          <label htmlFor="updatedAt" className="block text-white text-sm font-bold mb-2">Updated At</label>
          <input
            type="text"
            readOnly
            {...register("updatedAt")}
            className="w-full bg-gray-200 text-gray-dark px-4 py-2 rounded-md mb-2"
          />

          <button className="bg-blue text-white px-4 py-2 rounded-md w-full mt-4">Save</button>
        </form>
      </div>
    </div>
  );
}

export default ProfileFormPage;
