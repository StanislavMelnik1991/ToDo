export interface IToDoList {
  id: string,
  title: string,
  newTaskName: string;
  error: ErrorType;
  tasks: { [taskId: string]: Task };
  tasksForRender: string[];
  filter: Filter;
}

type Task = {
  id: string,
  isDone: boolean,
  title: string,
};

export type ErrorType = {
  isError: boolean,
  message: string
};

export type Filter = 'all' | 'active' | 'completed';
