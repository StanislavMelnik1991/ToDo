export interface IToDoList {
  id: string,
  title: string,
  newTaskName: string;
  tasks: { [taskId: string]: Task }
  tasksForRender: string[]
}

type Task = {
  id: string,
  isDone: boolean,
  title: string,
};
