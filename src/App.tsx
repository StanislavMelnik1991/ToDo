import { useAppDispatch, useAppSelector } from '@hooks';
import { useEffect } from 'react';
import { fetchToDoLists } from '@reducers/ActionCreator';
import { toDoListSlice } from '@reducers/toDoListSlice';
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
    dispatch(fetchToDoLists());
  }, []);

  const createToDoList = () => dispatch(createNewToDoList());
  const inputHandler = (name: string) => dispatch(setNewToDoListName(name));

  const toDoListsArr = Object.values(toDoLists);

  return (
    <div className={style.App}>
      <Header />
      <AddItemForm
        error={error}
        onAddHandler={createToDoList}
        onChangeHandler={inputHandler}
        value={newToDoListName}
      />
      <div className={style.toDoLists}>
        {toDoListsArr.map((toDoList) => {
          return <ToDoList
            id={toDoList.id}
            title={toDoList.title}
            tasks={toDoList.tasks}
            error={toDoList.error}
            filter={toDoList.filter}
            tasksForRender={toDoList.tasksForRender}
            newTaskName={toDoList.newTaskName}
            key={toDoList.id}
          />;
        })}
      </div>
      <Footer />
    </div>
  );
};

export default App;
