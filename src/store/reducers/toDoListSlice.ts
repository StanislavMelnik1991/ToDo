/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v1 } from 'uuid';
import { IToDoList } from '../../types';
import { toDoList } from './toDoList';

interface IToDoListState {
  toDoLists: { [id: string]: IToDoList },
  isLoading: boolean,
  error: string,
}

const initialState: IToDoListState = {
  toDoLists: {},
  isLoading: false,
  error: '',
};

export const toDoListSlice = createSlice({
  name: 'toDoList',
  initialState,
  reducers: {
    init(state) {
      state.toDoLists[toDoList.id] = toDoList;
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

    setNewTaskName(state, action: PayloadAction<{ toDoListId: string, name: string }>) {
      state.toDoLists[action.payload.toDoListId].newTaskName = action.payload.name;
    },

    createNewTask(state, action: PayloadAction<{ toDoListId: string }>) {
      const title = state.toDoLists[action.payload.toDoListId].newTaskName.trim();
      const taskId = v1();
      state.toDoLists[action.payload.toDoListId].tasks[taskId] = {
        id: taskId,
        isDone: false,
        title,
      };
      const tasksForRender = Object.keys(state.toDoLists[action.payload.toDoListId].tasks);
      state.toDoLists[action.payload.toDoListId].tasksForRender = tasksForRender;
    },

    setFilter(state, action: PayloadAction<{ toDoListId: string, filter: 'all' | 'active' | 'completed' }>) {
      const { tasks } = state.toDoLists[action.payload.toDoListId];
      const tasksForRender: string[] = [];
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

  },
});

export default toDoListSlice.reducer;
