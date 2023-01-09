import style from "./TaskForm.module.css";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { ITask } from "../../interfaces/Task";
interface Props {
  btnText: string;
  taskList: ITask[];
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
  task?: ITask | null;
  handleUpdate?(id: number, title: string, difficulty: number | string): void;
}

const TaskForm = ({
  btnText,
  taskList,
  setTaskList,
  task,
  handleUpdate,
}: Props) => {
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [difficulty, setDifficulty] = useState<number | string>(0);

  useEffect(() => {
    if (task) {
      setId(task.id);
      setTitle(task.title);
      setDifficulty(task.difficulty);
    }
  }, [task]);

  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleUpdate) {
      handleUpdate(id, title, difficulty);
    } else {
      const id: number = Math.floor(Math.random() * 1000);
      const newTask: ITask = {
        id,
        title,
        difficulty,
      };
      setTaskList!([...taskList, newTask]);
      setTitle("");
      setDifficulty("");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else {
      setDifficulty(Number(e.target.value));
    }
  };

  return (
    <form className={style.form} onSubmit={addTaskHandler}>
      <div className={style.input_container}>
        <label htmlFor="title">Título: </label>
        <input
          type="text"
          name="title"
          placeholder="Título da tarefa"
          onChange={handleChange}
          value={title}
          required
        />
      </div>
      <div className={style.input_container}>
        <label htmlFor="difficulty">Dificuldade: </label>
        <input
          type="text"
          name="difficulty"
          placeholder="Dificuldade da tarefa"
          onChange={handleChange}
          value={difficulty || ""}
          required
        />
      </div>
      <input type="submit" value={btnText} />
    </form>
  );
};

export default TaskForm;
