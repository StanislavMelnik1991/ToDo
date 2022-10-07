import { v1 } from 'uuid';
import { IToDoList } from '../../types';

const tasksId = [v1(), v1(), v1()];
export const toDoList: IToDoList = {
  id: v1(),
  title: 'What to learn',
  newTaskName: '',
  filter: 'all',
  error: { isError: false, message: '' },
  tasks: {
    [tasksId[0]]: { id: tasksId[0], isDone: true, title: 'JS' },
    [tasksId[1]]: { id: tasksId[0], isDone: false, title: 'React' },
    [tasksId[2]]: { id: tasksId[0], isDone: true, title: 'CSS' },
  },
  tasksForRender: tasksId,
};
