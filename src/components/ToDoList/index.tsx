import { useAppDispatch } from '@hooks';
import { toDoListSlice } from '@reducers/toDoListSlice';
import { Filter, IToDoList } from '../../types';
import * as style from './style.css';
import Task from '../Task';
import { AddItemForm } from '../AddItemForm';

const ToDoList = ({
  title, tasks, id, newTaskName, tasksForRender, error, filter,
}: IToDoList) => {
  const dispatch = useAppDispatch();
  const { setNewTaskName, createNewTask, setFilter } = toDoListSlice.actions;
  const input = (name: string) => {
    dispatch(setNewTaskName({ toDoListId: id, name }));
  };
  const create = () => {
    dispatch(createNewTask({ toDoListId: id }));
  };
  const setFilterHandler = (filter: Filter) => {
    dispatch(setFilter({ toDoListId: id, filter }));
  };
  return (
    <div className={style.wrapper}>
      <h3>{title}</h3>
      <AddItemForm
        error={error}
        onAddHandler={create}
        onChangeHandler={input}
        value={newTaskName}
      />
      <ul className={style.tasks}>
        {tasksForRender.map((taskId) => {
          return (
            <Task
              taskId={taskId}
              isDone={tasks[taskId].isDone}
              title={tasks[taskId].title}
              toDoListId={id}
              key={taskId}
            />
          );
        })}
      </ul>
      <div>
        <button className={filter === 'all' && style.active_btn} onClick={() => setFilterHandler('all')}>All</button>
        <button className={filter === 'active' && style.active_btn} onClick={() => setFilterHandler('active')}>Active</button>
        <button className={filter === 'completed' && style.active_btn} onClick={() => setFilterHandler('completed')}>Completed</button>
      </div>
    </div>
  );
};

export default ToDoList;
