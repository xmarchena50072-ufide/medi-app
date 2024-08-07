import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTasks } from '../context/TasksContext';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

function TaskCard({ task }) {
  const { deleteTask } = useTasks();
  const { t } = useTranslation();

  return (
    <div key={task._id} className="bg-gray-dark w-full p-6 rounded-md mb-4 shadow-md">
      <header className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">
          {task.title}
        </h1>
        <div className="flex gap-x-2 items-center">
          <button
            className="bg-red text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            onClick={() => {
              deleteTask(task._id);
            }}
          >
            {t('taskCard.delete')}
          </button>
          <Link
            to={`/tasks/${task._id}`}
            className="bg-blue text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            {t('taskCard.edit')}
          </Link>
        </div>
      </header>
      <p className="text-gray-light mt-2">
        {task.description}
      </p>
      <p className="text-gray mt-1">
        {dayjs(task.date).utc().format("DD/MM/YYYY")}
      </p>
    </div>
  );
}

export default TaskCard;
