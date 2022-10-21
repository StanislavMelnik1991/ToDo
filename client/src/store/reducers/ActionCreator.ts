/* eslint-disable no-console */
import axios, { AxiosResponse } from 'axios';
import { AppDispatch } from '../index';
import { toDoListSlice } from './toDoListSlice';

export const fetchToDoLists = () => async (dispatch: AppDispatch) => {
  axios.get('http://localhost:5000/api/todolist/1', {}).then((response: AxiosResponse) => {
    dispatch(toDoListSlice.actions.init(response.data));
  })
    .catch((error) => {
      console.log(error);
    });
};
