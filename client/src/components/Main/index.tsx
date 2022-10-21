import {
  Container, Grid, Paper,
} from '@mui/material';
import { NoteAdd } from '@mui/icons-material/';
import { useAppDispatch, useAppSelector } from '@hooks';
import { useEffect } from 'react';
import { toDoListSlice } from '@reducers/toDoListSlice';
import { fetchToDoLists } from '@reducers/ActionCreator';
import ToDoList from '../ToDoList';
import { AddItemForm } from '../AddItemForm';

export const Main = () => {
  const dispatch = useAppDispatch();
  const { toDoLists, error, newToDoListName } = useAppSelector((state) => state.toDoListReducer);
  const { createNewToDoList, setNewToDoListName } = toDoListSlice.actions;
  useEffect(() => {
    dispatch(fetchToDoLists());
  }, []);

  const createToDoList = () => dispatch(createNewToDoList());
  const inputHandler = (name: string) => dispatch(setNewToDoListName(name));

  const toDoListsArr = Object.values(toDoLists);
  return (
    <Container fixed>
      <Grid container style={{ padding: '0 0 2rem 0' }}>
        <Paper style={{ padding: '1rem' }}>
          <AddItemForm
            error={error}
            button={<NoteAdd />}
            onAddHandler={createToDoList}
            onChangeHandler={inputHandler}
            value={newToDoListName}
            autoFocus={false}
            message={'ToDoList name'}
          />
        </Paper>
      </Grid>
      <Grid container spacing={3}>
        {toDoListsArr.map((toDoList) => {
          return <Grid item key={toDoList.id}>
            <Paper style={{ padding: '1rem' }} variant='elevation'>
              <ToDoList
                id={toDoList.id}
                title={toDoList.title}
                tasks={toDoList.tasks}
                error={toDoList.error}
                filter={toDoList.filter}
                tasksForRender={toDoList.tasksForRender}
                newTaskName={toDoList.newTaskName}
                key={toDoList.id}
              />
            </Paper>
          </Grid>;
        })}

      </Grid>
    </Container>
  );
};
