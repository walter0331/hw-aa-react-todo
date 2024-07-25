import React, { createContext, useReducer, ReactNode } from 'react';
import { taskReducer } from '../reducers/taskReducer';
import { State, Action, SortType } from '../types';

export interface TaskContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const initialState: State = {
  tasks: [],
  filter: null,
  sortOrder: SortType.DESCENDING,
  searchQuery: ''
};

const TaskContext = createContext<TaskContextProps>({
  state: initialState,
  dispatch: () => null
});

const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };