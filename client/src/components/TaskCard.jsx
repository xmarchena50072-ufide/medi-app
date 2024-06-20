import React from 'react'

function TaskCard({ task }) {
    return (
        <div key={task._id} className='bg-blue w-full p-10 rounded-md'>
            <header className='flex justify-between'>
                <h1 className='text-2xl font-bold'>
                    {task.title}
                </h1>
                <div className='flex gap-x-2 items-center'>
                    <button onClick={() => {
                        console.log(task._id)
                    }}>delete</button>
                    <button>edit</button>
                </div>
            </header>

            <p className='text-gray-light'>{task.description}</p>
            <p>{new Date(task.date).toLocaleDateString()}</p>
        </div>
    )
}

export default TaskCard