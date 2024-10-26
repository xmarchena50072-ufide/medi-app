import { useEffect, useState } from "react";
import { useTasks } from "../context/TasksContext";
import TaskCard from "../components/TaskCard";
function TasksPage() {
  const { getTasks, tasks } = useTasks();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    let updatedTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOrder === "asc") {
      updatedTasks.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      updatedTasks.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredTasks(updatedTasks);
  }, [tasks, searchTerm, sortOrder]);

  if (tasks.length === 0) return <h1>No hay citas</h1>;

  return (
    <div className="p-6 bg-gray-dark min-h-screen flex flex-col items-center">
      <h1 className="text-3xl text-white font-bold mb-4">Citas</h1>
      
      <div className="w-full max-w-4xl mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Busca citas..."
          className="px-4 py-2 mr-2 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 rounded-md"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ordena por Título (A-Z)</option>
          <option value="desc">Ordena by Título (Z-A)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {filteredTasks.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div>
    </div>
  );
}

export default TasksPage;
