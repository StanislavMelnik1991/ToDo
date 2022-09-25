import { AppDispatch } from '../index';
import { toDoListSlice } from './toDoListSlice';

export const fetchToDoLists = () => (dispatch: AppDispatch) => {
  dispatch(toDoListSlice.actions.init());
};
