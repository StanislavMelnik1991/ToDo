import { useAppDispatch, useAppSelector } from '@hooks';
import { useEffect } from 'react';
import { fetchToDoLists } from '@reducers/ActionCreator';
import * as style from './App.css';
import ToDoList from './components/ToDoList';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const dispatch = useAppDispatch();
  const { toDoLists } = useAppSelector((state) => state.toDoListReducer);
  useEffect(() => {
    dispatch(fetchToDoLists());
  }, []);
  const toDoListsArr = Object.keys(toDoLists);

  return (
  <div className={style.App}>
    <Header />
    {toDoListsArr.map((toDoList) => {
      return <ToDoList
      id={toDoList}
      title={toDoLists[toDoList].title}
      tasks={toDoLists[toDoList].tasks}
      tasksForRender={toDoLists[toDoList].tasksForRender}
      newTaskName={toDoLists[toDoList].newTaskName}
      key={toDoList}
    />;
    })}
    <Footer />
  </div>
  );
};

export default App;
