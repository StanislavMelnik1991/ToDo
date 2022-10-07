import { useAppDispatch } from '@hooks';
import { toDoListSlice } from '@reducers/toDoListSlice';
import { ITask } from '../../types';
import { EditableSpan } from '../EditableSpan';
import * as style from './style.css';

interface TaskProps extends ITask { toDoListId: string }
const Task = ({
  id, isDone, title, toDoListId,
}: TaskProps) => {
  const dispatch = useAppDispatch();
  const { toggleIsDone, removeTask, changeTaskName } = toDoListSlice.actions;
  const toggle = (toDoListId: string, taskId: string) => {
    dispatch(toggleIsDone({ toDoListId, taskId }));
  };
  const remove = (toDoListId: string, taskId: string) => {
    dispatch(removeTask({ toDoListId, taskId }));
  };
  const renameTask = (title: string) => {
    dispatch(changeTaskName({ name: title, taskId: id, toDoListId }));
  };

  const removeBtn = <button onClick={() => remove(toDoListId, id)}>X</button>;
  return (
    <li key={id} className={`${style.wrapper} ${isDone && style.completed}`}>
      <input type="checkbox" checked={isDone} onChange={() => toggle(toDoListId, id)} />
      <EditableSpan
        title={title}
        onChangeHandler={renameTask}
        buttons={removeBtn} />
    </li>
  );
};

export default Task;
