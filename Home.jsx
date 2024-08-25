import { useEffect, useState } from 'react';
import Draggable from 'react-draggable'; 
import './To-do.css';
import Task from './Task'

const Home = () => {
    const [task, setTasks] = useState(() => {
        // Retrieve tasks from localStorage, or start with an empty array
        const savedTasks = localStorage.getItem('task');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState(''); 

    useEffect(() => {
        // Save tasks to localStorage whenever the task state changes
        localStorage.setItem('task', JSON.stringify(task));
    }, [task]);

    const submitHandler = (e) => {
        e.preventDefault();
        setTasks([...task, { title, description, index: task.length }]); 
        setTitle(""); 
        setDescription(""); 
    };

    const deleteHandler = (index) => {
        setTasks(task.filter((task) => task.index !== index));
    };

    return (
        <div className="container">
            <center><h1>My Daily Task List</h1></center>
            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required
                />
                <textarea
                    placeholder="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required
                />
                <button type='submit'>Submit</button>
            </form>
            <div className="task">
                {task.map((task) => (
                    <Draggable key={task.index} handle=".handle">
                        <div className="task-container">
                            <Task
                                title={task.title}
                                description={task.description} 
                                onDelete={() => deleteHandler(task.index)}
                            />
                            <div className="handle"><center>Done</center></div> 
                        </div>
                    </Draggable>
                ))}
            </div>
        </div>
    );
};

export default Home;
