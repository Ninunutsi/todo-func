import React, { useCallback, useState } from "react";

const TodoItem = React.memo(({task, onDelete, onDone, id}) => {
  console.log('re-render')
  return (
    <li>
      {task}
      <button onClick={() => onDelete(id)}>delete</button>
      <button onClick={() => onDone(task)}>done</button>
    </li>
  )
});

const DoneTask = React.memo(({task, onDelete, onReset, id}) => {
  console.log('re-rendered done')
  return (
    <li>
      {task}
      <button onClick={() => onDelete(id)}>delete</button>
      <button onClick={() => onReset(id)}>reset</button>
    </li>
  )
})

const FuncTodo = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState("");
  const [doneTasks, setDoneTasks] = useState([]);

  const handleChange = useCallback((event) => {
    setCurrentTask(event.target.value)
  }, [])
  // const handleChange = (event) => {
  //   setCurrentTask(event.target.value);
  // };


  const handleSubmit = useCallback((event) => {
    event.preventDefault()
    console.log('submit')
    const task = [...tasks, currentTask]
    setTasks(task);
     setCurrentTask("");
  }, [currentTask, tasks])

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const task =[...tasks, currentTask]
  //     setTasks(task);
  //     setCurrentTask("");
  //   }
  // };

  const handleDelete = useCallback((id) => {
    console.log('delete')
    const  updatedTasks = tasks.filter((_, index) => index != id)
    setTasks(updatedTasks)
  }, [tasks])

  // const handleDelete = (index) => {
  //   const updatedTasks = [...tasks];
  //   updatedTasks.splice(index, 1);
  //   setTasks(updatedTasks);
  // };


const handleDone = useCallback((task) => {
  console.log('done')
  setTasks((tasks) => tasks.filter((t) => t != task))
  setDoneTasks((dones) => [...dones, task])
}, [])
  // const handleDone = (index) => {
  //   const updatedTasks = [...tasks];
  //   const completedTask = updatedTasks.splice(index, 1)[0];
  //   completedTask.done = true;
  //   setTasks(updatedTasks);
  //   setDoneTasks([...doneTasks, completedTask]);
  // };

  const handleDoneDelete = useCallback((id) => {
    console.log('done delete')
    const updatedTasks = doneTasks.filter((_, index) => index !== id)
    setDoneTasks(updatedTasks)

  }, [doneTasks])
  // const handleDoneDelete = (index) => {
  //   const updatedDoneTasks = [...doneTasks];
  //   updatedDoneTasks.splice(index, 1);
  //   setDoneTasks(updatedDoneTasks);
  // };

  const handleReset = useCallback((id) => {
    console.log('reset')
    const resetTask = doneTasks[id]
    const updatedTasks = [...tasks, resetTask]
    const updatedDoneTasks = doneTasks.filter((_, index)  => index !== id)
    setTasks(updatedTasks)
    setDoneTasks(updatedDoneTasks)
  }, [doneTasks, tasks])

  // const handleReset = (index) => {
  //   const resetTask = doneTasks.splice(index, 1)[0];
  //   setTasks([...tasks, resetTask]);
  //   setDoneTasks([...doneTasks]);
  // };

  return (
    <div>
      <h1>Todo app</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter a task"
          onChange={handleChange}
          value={currentTask}
        />
        <button type="submit">add task</button>
      </form>

      <ul>
        {tasks.map((task, index) => (
          <TodoItem 
          key={index}
          id={index}
          task={task}
          onDelete={handleDelete}
          onDone={handleDone}
          />
        ))}
      </ul>

      <h1>Done Tasks</h1>
      <ul>
        {doneTasks.map((task, index) => (
          <DoneTask 
            key={index}
            id={index}
            onDelete={handleDoneDelete}
            onReset={handleReset}
            task={task}
          /> 
        ))}
      </ul>
    </div>
  );
};

export default FuncTodo;
