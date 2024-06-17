import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";

function TaskFormPage() {
  const { register, handleSubmit } = useForm();
  const { createTask } = useTasks();

  const onSubmit = handleSubmit((data) => {
    createTask(data);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <form onSubmit={onSubmit} className="bg-blue max-w-md w-full p-10 rounded-md ">
        <input
          type="text"
          placeholder="Title"
          {...register("title")}
          className="w-full bg-gray text-white px-4 py-2 rounded-md my-2"
          autoFocus
        />
        <textarea
          rows="3"
          placeholder="Description"
          {...register("description")}
          className="w-full bg-gray text-white px-4 py-2 rounded-md my-2"
          autoFocus
        ></textarea>

        <button>Save</button>
      </form>
    </div>
  )
}

export default TaskFormPage