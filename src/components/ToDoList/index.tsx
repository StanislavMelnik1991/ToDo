import { useAppDispatch } from '@hooks';
import { toDoListSlice } from '@reducers/toDoListSlice';
import { Button, IconButton } from '@mui/material';
import { Delete, NoteAdd } from '@mui/icons-material';
import { Filter, IToDoList } from '../../types';
import * as style from './style.css';
import Task from '../Task';
import { AddItemForm } from '../AddItemForm';
import { EditableSpan } from '../EditableSpan';

const ToDoList = ({
  title, tasks, id, newTaskName, tasksForRender, error, filter,
}: IToDoList) => {
  const dispatch = useAppDispatch();
  const {
    setNewTaskName, createNewTask, setFilter, changeTaskName, removeToDoList,
  } = toDoListSlice.actions;
  const input = (name: string) => {
    dispatch(setNewTaskName({ toDoListId: id, name }));
  };
  const create = () => {
    dispatch(createNewTask({ toDoListId: id }));
  };
  const setFilterHandler = (filter: Filter) => {
    dispatch(setFilter({ toDoListId: id, filter }));
  };

  const renameTask = (title: string) => {
    dispatch(changeTaskName({ name: title, toDoListId: id }));
  };
  const remove = (toDoListId: string) => {
    dispatch(removeToDoList({ toDoListId }));
  };

  const removeBtn = <IconButton
    aria-label="delete"
    onClick={() => remove(id)} >
    <Delete />
  </IconButton>;

  return (
    <div className={style.wrapper}>
      <h3>
        <EditableSpan
          title={title}
          onChangeHandler={renameTask}
          buttons={removeBtn}
        />
      </h3>
      <AddItemForm
        error={error}
        button={<NoteAdd />}
        onAddHandler={create}
        onChangeHandler={input}
        value={newTaskName}
        autoFocus={false}
      />
      <ul className={style.tasks}>
        {tasksForRender.map((taskId) => {
          return (
            <Task
              id={taskId}
              isDone={tasks[taskId].isDone}
              title={tasks[taskId].title}
              toDoListId={id}
              error={tasks[taskId].error}
              key={taskId}
            />
          );
        })}
      </ul>
      <div>
        <Button
          color={'inherit'}
          variant={filter === 'all' ? 'contained' : 'text'}
          onClick={() => setFilterHandler('all')}>
          All
        </Button>
        <Button
          variant={filter === 'active' ? 'contained' : 'text'}
          color={'primary'}
          onClick={() => setFilterHandler('active')}>
          Active
        </Button>
        <Button
          variant={filter === 'completed' ? 'contained' : 'text'}
          color={'secondary'}
          onClick={() => setFilterHandler('completed')}>
          Completed
        </Button>
      </div>
    </div>
  );
};

export default ToDoList;
