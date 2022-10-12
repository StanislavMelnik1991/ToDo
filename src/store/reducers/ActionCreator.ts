import { AppDispatch } from '../index';
import { toDoListSlice } from './toDoListSlice';
import { IToDoList } from '../../types';

export const fetchToDoLists = (toDoList: IToDoList) => (dispatch: AppDispatch) => {
  dispatch(toDoListSlice.actions.init(toDoList));
};
