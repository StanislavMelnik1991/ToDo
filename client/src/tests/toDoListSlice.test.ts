import toDoListReducer, {
  toggleIsDone,
  setNewToDoListName,
  setNewTaskName,
  createNewToDoList,
  createNewTask,
  IToDoListState,
} from '../store/reducers/toDoListSlice';

const initialState: IToDoListState = {
  error: { isError: false, message: '' },
  isLoading: false,
  newToDoListName: '',
  toDoLists: {
    toDoListId: {
      error: { isError: false, message: '' },
      filter: 'all',
      id: 'toDoListId',
      newTaskName: '',
      tasks: {
        taskId: {
          id: 'taskId',
          error: { isError: false, message: '' },
          isDone: false,
          title: 'task',
        },
      },
      tasksForRender: ['taskId'],
      title: 'toDoList',
    },
  },
};

test('createNewToDoList', () => {
  const startState = toDoListReducer(initialState, setNewToDoListName('testToDoList'));
  const endState = toDoListReducer(startState, createNewToDoList());
  expect(Object.values(endState.toDoLists).length).toBe(2);
  expect(Object.values(endState.toDoLists)[1].title).toBe('testToDoList');
});

test('createNewTask', () => {
  const startState = toDoListReducer(initialState, setNewTaskName({ toDoListId: 'toDoListId', name: 'taskId2' }));
  const endState = toDoListReducer(startState, createNewTask({ toDoListId: 'toDoListId' }));
  expect(Object.values(Object.values(endState.toDoLists)[0].tasks).length).toBe(2);
  expect(Object.values(Object.values(endState.toDoLists)[0].tasks)[1].title).toBe('taskId2');
});

test('toggleIsDone', () => {
  const startState = initialState;
  const endState = toDoListReducer(startState, toggleIsDone({ toDoListId: 'toDoListId', taskId: 'taskId' }));
  expect(endState.toDoLists.toDoListId.tasks.taskId.isDone).toBe(true);
});
