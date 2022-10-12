import { useAppDispatch } from '@hooks';
import { Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
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

  const removeBtn = <IconButton
    aria-label="delete"
    onClick={() => remove(toDoListId, id)} >
    <DeleteIcon />
  </IconButton>;
  return (
    <li key={id} className={`${style.wrapper} ${isDone && style.completed}`}>
      <Checkbox checked={isDone} onChange={() => toggle(toDoListId, id)} />
      <EditableSpan
        title={title}
        onChangeHandler={renameTask}
        buttons={removeBtn} />
    </li>
  );
};

export default Task;
