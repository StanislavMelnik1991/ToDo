import { useAppDispatch, useAppSelector } from '@hooks';
import { useEffect } from 'react';
import { fetchToDoLists } from '@reducers/ActionCreator';
import { toDoListSlice } from '@reducers/toDoListSlice';
import { toDoList } from '@reducers/toDoList';
import { NoteAdd } from '@mui/icons-material';
import { Container, Grid, Paper } from '@mui/material';
import * as style from './App.css';
import ToDoList from './components/ToDoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AddItemForm } from './components/AddItemForm';

const App = () => {
  const dispatch = useAppDispatch();
  const { toDoLists, error, newToDoListName } = useAppSelector((state) => state.toDoListReducer);
  const { createNewToDoList, setNewToDoListName } = toDoListSlice.actions;
  useEffect(() => {
    dispatch(fetchToDoLists(toDoList));
  }, []);

  const createToDoList = () => dispatch(createNewToDoList());
  const inputHandler = (name: string) => dispatch(setNewToDoListName(name));

  const toDoListsArr = Object.values(toDoLists);

  return (
    <div className={style.App}>
      <Header />
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
            />
          </Paper>
        </Grid>
        <Grid container spacing={3}>
          {toDoListsArr.map((toDoList) => {
            return <Grid item>
              <Paper style={{ padding: '1rem' }}>
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
      <Footer />
    </div>
  );
};

export default App;
