import { useAppDispatch } from '@hooks';
import { toDoListSlice } from '@reducers/toDoListSlice';
import { IToDoList } from '../../types';
import * as style from './style.css';
import Task from '../Task';

const ToDoList = ({
  title, tasks, id, newTaskName, tasksForRender,
}: IToDoList) => {
  const dispatch = useAppDispatch();
  const { setNewTaskName, createNewTask, setFilter } = toDoListSlice.actions;
  const input = (name: string) => {
    dispatch(setNewTaskName({ toDoListId: id, name }));
  };
  const create = () => {
    dispatch(createNewTask({ toDoListId: id }));
  };
  const filter = (filter: 'all' | 'active' | 'completed') => {
    dispatch(setFilter({ toDoListId: id, filter }));
  };
  return (
    <div className={style.wrapper}>
      <h3>{title}</h3>
      <div>
        <input
        type="text"
        value={newTaskName}
        onChange={(ev) => {
          input(ev.currentTarget.value);
        }}
        />
        <button onClick={() => { create(); }}>+</button>
      </div>
      <ul>
        {tasksForRender.map((taskId) => {
          return (
            <Task
              id={taskId}
              isDone={tasks[taskId].isDone}
              title={tasks[taskId].title}
              toDoListId={id}
              key={taskId}
            />
          );
        })}
      </ul>
      <div>
        <button onClick={() => filter('all')}>All</button>
        <button onClick={() => filter('active')}>Active</button>
        <button onClick={() => filter('completed')}>Completed</button>
      </div>
    </div>
  );
};

export default ToDoList;
