import { useAppDispatch } from '@hooks';
import { toDoListSlice } from '@reducers/toDoListSlice';
import * as style from './style.css';

type TaskType = {
  id: string,
  title: string,
  isDone: boolean,
  toDoListId: string
};

const Task = ({
  id, title, isDone, toDoListId,
}: TaskType) => {
  const dispatch = useAppDispatch();
  const { toggleIsDone, removeTask } = toDoListSlice.actions;
  const toggle = (toDoListId: string, taskId: string) => {
    dispatch(toggleIsDone({ toDoListId, taskId }));
  };
  const remove = (toDoListId: string, taskId: string) => {
    dispatch(removeTask({ toDoListId, taskId }));
  };

  return (
    <li key={id} className={style.wrapper}>
      <input type="checkbox" checked={isDone} onChange={() => toggle(toDoListId, id)}/><span>{title}</span>
      <button onClick={() => remove(toDoListId, id)}>X</button>
    </li>
  );
};

export default Task;
