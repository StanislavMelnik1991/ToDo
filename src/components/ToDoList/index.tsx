import { useAppDispatch } from '@hooks';
import { toDoListSlice } from '@reducers/toDoListSlice';
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
    setNewTaskName, createNewTask, setFilter, changeTaskName,
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

  return (
    <div className={style.wrapper}>
      <h3>
        <EditableSpan
          title={title}
          onChangeHandler={renameTask}
        />
      </h3>
      <AddItemForm
        error={error}
        button='+'
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
        <button className={`${filter === 'all' ? '' : 'style.active_btn'}`} onClick={() => setFilterHandler('all')}>All</button>
        <button className={`${filter === 'active' ? '' : 'style.active_btn'}`} onClick={() => setFilterHandler('active')}>Active</button>
        <button className={`${filter === 'completed' ? '' : 'style.active_btn'}`} onClick={() => setFilterHandler('completed')}>Completed</button>
      </div>
    </div>
  );
};

export default ToDoList;
