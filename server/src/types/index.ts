export type ErrorType = {
  isError: boolean,
  message: string
};

export type Filter = 'all' | 'active' | 'completed';

export interface ITask {
  id: string,
  isDone: boolean,
  title: string,
  error: ErrorType,
}

export interface IToDoList {
  id: string,
  title: string,
  newTaskName: string;
  error: ErrorType;
  tasks: { [taskId: string]: ITask };
  tasksForRender: string[];
  filter: Filter;
}
