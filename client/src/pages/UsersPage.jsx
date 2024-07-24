import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function UsersPage() {
  const { getUsers } = useAuth();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    }
    fetchUsers();
  }, [getUsers]);

  useEffect(() => {
    let updatedUsers = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOrder === "asc") {
      updatedUsers.sort((a, b) => a.username.localeCompare(b.username));
    } else {
      updatedUsers.sort((a, b) => b.username.localeCompare(a.username));
    }

    setFilteredUsers(updatedUsers);
  }, [users, searchTerm, sortOrder]);

  if (users.length === 0) return <h1>No hay usuarios</h1>;

  return (
    <div className="p-6 bg-gray-dark min-h-screen flex flex-col items-center">
      <h1 className="text-3xl text-white font-bold mb-4">Usuarios</h1>
      
      <div className="w-full max-w-4xl mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Busca usuarios..."
          className="px-4 py-2 mr-2 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 rounded-md"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ordena por Nombre (A-Z)</option>
          <option value="desc">Ordena por Nombre (Z-A)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {filteredUsers.map((user) => (
          <div key={user._id} className="bg-gray-700 text-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold">{user.username}</h2>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersPage;
