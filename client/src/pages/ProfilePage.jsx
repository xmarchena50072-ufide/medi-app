import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function ProfilePage() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div>
        <h1>You are not logged in</h1>
        <Link to="/login" className="bg-blue px-4 py-1 rounded-sm">Login</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 p-5 bg-gray-light rounded-md">
      <h1 className="text-2xl font-bold mb-5">Profile</h1>
      <div className="bg-white p-5 shadow-md rounded-md">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <Link to="/edit-profile" className="text-white bg-blue px-4 py-1 rounded-sm mt-5 inline-block">Edit Profile</Link>
    </div>
  );
}

export default ProfilePage;
