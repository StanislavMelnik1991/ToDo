/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v1 } from 'uuid';
import { ErrorType, Filter, IToDoList } from '../../types';

export interface IToDoListState {
  toDoLists: { [id: string]: IToDoList },
  isLoading: boolean,
  newToDoListName: string,
  error: ErrorType,
}

export const initialState: IToDoListState = {
  toDoLists: {},
  isLoading: false,
  newToDoListName: '',
  error: { isError: false, message: '' },
};

export const toDoListSlice = createSlice({
  name: 'toDoList',
  initialState,
  reducers: {
    init(state, action: PayloadAction<IToDoList>) {
      state.toDoLists[action.payload.id] = action.payload;
    },

    toggleIsDone(state, action: PayloadAction<{ toDoListId: string, taskId: string }>) {
      const { isDone } = state.toDoLists[action.payload.toDoListId].tasks[action.payload.taskId];
      state.toDoLists[action.payload.toDoListId].tasks[action.payload.taskId].isDone = !isDone;
    },

    removeTask(state, action: PayloadAction<{ toDoListId: string, taskId: string }>) {
      delete state.toDoLists[action.payload.toDoListId].tasks[action.payload.taskId];
      const tasksForRender = Object.keys(state.toDoLists[action.payload.toDoListId].tasks);
      state.toDoLists[action.payload.toDoListId].tasksForRender = tasksForRender;
    },
    removeToDoList(state, action: PayloadAction<{ toDoListId: string }>) {
      delete state.toDoLists[action.payload.toDoListId];
    },

    setNewTaskName(state, action: PayloadAction<{ toDoListId: string, name: string }>) {
      state.toDoLists[action.payload.toDoListId].newTaskName = action.payload.name;
      state.toDoLists[action.payload.toDoListId].error.isError = false;
    },
    setNewToDoListName(state, action: PayloadAction<string>) {
      state.newToDoListName = action.payload;
      state.error.isError = false;
    },
    createNewToDoList(state) {
      state.newToDoListName = state.newToDoListName.trim();
      if (state.newToDoListName === '') {
        state.error.isError = true;
        state.error.message = 'Title is required';
        return;
      }
      const id = v1();
      const toDoList: IToDoList = {
        error: { isError: false, message: '' },
        filter: 'all',
        id,
        newTaskName: '',
        tasks: {},
        tasksForRender: [],
        title: state.newToDoListName,
      };
      state.toDoLists[id] = toDoList;
    },

    createNewTask(state, action: PayloadAction<{ toDoListId: string }>) {
      const title = state.toDoLists[action.payload.toDoListId].newTaskName.trim();
      state.toDoLists[action.payload.toDoListId].newTaskName = title;
      if (title === '') {
        state.toDoLists[action.payload.toDoListId].error.isError = true;
        state.toDoLists[action.payload.toDoListId].error.message = 'Title is required';
        return;
      }
      const taskId = v1();
      state.toDoLists[action.payload.toDoListId].tasks[taskId] = {
        id: taskId,
        isDone: false,
        title,
        error: { isError: false, message: '' },
      };
      state.toDoLists[action.payload.toDoListId].newTaskName = '';
      const tasksForRender = Object.keys(state.toDoLists[action.payload.toDoListId].tasks);
      state.toDoLists[action.payload.toDoListId].tasksForRender = tasksForRender;
    },

    setFilter(state, action: PayloadAction<{ toDoListId: string, filter: Filter }>) {
      const { tasks } = state.toDoLists[action.payload.toDoListId];
      const tasksForRender: string[] = [];
      state.toDoLists[action.payload.toDoListId].filter = action.payload.filter;
      switch (action.payload.filter) {
        case 'active':
          Object.keys(tasks).forEach((id) => {
            if (!tasks[id].isDone) {
              tasksForRender.push(id);
            }
          });
          state.toDoLists[action.payload.toDoListId].tasksForRender = tasksForRender;
          break;
        case 'completed':
          Object.keys(tasks).forEach((id) => {
            if (tasks[id].isDone) {
              tasksForRender.push(id);
            }
          });
          state.toDoLists[action.payload.toDoListId].tasksForRender = tasksForRender;
          break;

        default:
          state.toDoLists[action.payload.toDoListId].tasksForRender = Object.keys(tasks);
          break;
      }
    },
    changeTaskName(
      state,
      action: PayloadAction<{ toDoListId: string, taskId?: string, name: string }>,
    ) {
      if (!action.payload.taskId) {
        const title = state.toDoLists[action.payload.toDoListId];
        title.title = action.payload.name;
      } else {
        const task = state.toDoLists[action.payload.toDoListId].tasks[action.payload.taskId];
        task.error.isError = false;
        task.error.message = '';
        task.title = action.payload.name;
      }
    },

  },
});

export default toDoListSlice.reducer;
export const {
  changeTaskName,
  createNewTask,
  createNewToDoList,
  init, removeTask,
  removeToDoList,
  setFilter,
  setNewTaskName,
  setNewToDoListName,
  toggleIsDone,
} = toDoListSlice.actions;
