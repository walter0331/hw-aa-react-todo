import { Task, State, Action, TaskStatus, SortType } from '../types';
import {
  ADD_TASK,
  TOGGLE_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  SET_SORT_ORDER,
  SET_FILTER,
  SET_SEARCH_QUERY,
} from '../types/actionTypes';

const sortTasksByCreatedAt = (tasks: Task[], order: SortType): Task[] => {
  return tasks.slice().sort((a, b) => {
    if (order === SortType.ASCENDING) {
      return a.createdAt - b.createdAt;
    } else {
      return b.createdAt - a.createdAt;
    }
  });
};

export const taskReducer = (state: State, action: Action): State => {
  const { type, payload } = action;

  switch (type) {
    case ADD_TASK:
      const newTasks = [
        ...state.tasks,
        {
          ...payload,
          status: TaskStatus.INCOMPLETE,
        },
      ];
      return {
        ...state,
        tasks: sortTasksByCreatedAt(newTasks, state.sortOrder),

        // Reset the filter to show all tasks when a new task is added
        filter: null,
      };
    case TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === payload
            ? { ...task, status: task.status === TaskStatus.COMPLETED ? TaskStatus.INCOMPLETE : TaskStatus.COMPLETED }
            : task
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== payload),
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === payload.id ? { ...task, description: payload.description } : task
        ),
      };
    case SET_SORT_ORDER:
      return {
        ...state,
        sortOrder: payload,
        tasks: sortTasksByCreatedAt(state.tasks, payload),
      };
    case SET_FILTER:
      return {
        ...state,
        filter: payload,
      };
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: payload,
      };
    default:
      return state;
  }
};