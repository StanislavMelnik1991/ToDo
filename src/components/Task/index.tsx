import { useAppDispatch } from '@hooks';
import { toDoListSlice } from '@reducers/toDoListSlice';
import { EditableSpan } from '../EditableSpan';
import * as style from './style.css';

type TaskType = {
  taskId: string,
  title: string,
  isDone: boolean,
  toDoListId: string
};

const Task = ({
  taskId, title, isDone, toDoListId,
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
    <li key={taskId} className={`${style.wrapper} ${isDone && style.completed}`}>
      <input type="checkbox" checked={isDone} onChange={() => toggle(toDoListId, taskId)}/>
      <EditableSpan title={title} />
      <button onClick={() => remove(toDoListId, taskId)}>X</button>
    </li>
  );
};

export default Task;
