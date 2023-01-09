import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import style from "./App.module.css";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import { useState } from "react";
import { ITask } from "./interfaces/Task";
import Modal from "./components/Modal/Modal";
function App() {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);
  const deleteTask = (id: number) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };
  const updateTask = (
    id: number,
    title: string,
    difficulty: number | string
  ) => {
    const updateTask: ITask = { id, title, difficulty };
    const updatedItems = taskList.map((task) => {
      console.log(task);
      return task.id === updateTask.id ? updateTask : task;
    });
    console.log(updatedItems);
    setTaskList(updatedItems);
    hideOrShowModal(false);
  };
  const hideOrShowModal = (display: boolean) => {
    const modal = document.getElementById("modal");
    if (display) {
      modal!.classList.remove("hide");
    } else {
      modal!.classList.add("hide");
    }
  };
  const editTask = (task: ITask): void => {
    hideOrShowModal(true);
    setTaskToUpdate(task);
  };
  return (
    <div>
      <Modal
        children={
          <TaskForm
            btnText="Editar tarefas"
            taskList={taskList}
            setTaskList={setTaskList}
            task={taskToUpdate}
            handleUpdate={updateTask}
          />
        }
      />
      <Header />
      <div className={style.main}>
        <div>
          <h2>O que você vai fazer?</h2>
        </div>
        <TaskForm
          btnText="Criar tarefas"
          taskList={taskList}
          setTaskList={setTaskList}
        />
        <div>
          <h2>Suas tarefas:</h2>
          <TaskList
            taskList={taskList}
            handleDelete={deleteTask}
            handleEdit={editTask}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
