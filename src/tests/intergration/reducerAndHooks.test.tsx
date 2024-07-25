import React from 'react';
import { renderHook } from '@testing-library/react';
import { taskReducer } from '../../reducers/taskReducer';
import useFilteredTasks from '../../hooks/useFilteredTasks';
import { TaskStatus, SortType, State } from '../../types';
import { initialState } from '../../context/TaskContext';
import {
  ADD_TASK,
  SET_SORT_ORDER,
  SET_FILTER,
  SET_SEARCH_QUERY,
} from '../../types/actionTypes';

const createInitialState = () => ({
  ...initialState,
  tasks: [
    { id: '1', description: 'First Task', status: TaskStatus.COMPLETED, createdAt: Date.now() + 2 },
    { id: '2', description: 'Second Task', status: TaskStatus.INCOMPLETE, createdAt: Date.now() + 1 },
    { id: '3', description: 'Third Task', status: TaskStatus.COMPLETED, createdAt: Date.now() },
  ],
});

describe('Reducer and Hooks Integration', () => {
  let state: State;

  beforeEach(() => {
    state = createInitialState();
  });

  it('should handle Ascending + All Tasks + No Search Query', () => {
    state = taskReducer(state, { type: SET_SORT_ORDER, payload: SortType.ASCENDING });

    const { result } = renderHook(() => useFilteredTasks(state.tasks, state.filter, state.searchQuery));
    const sortedTasks = result.current;

    expect(sortedTasks[0].description).toBe('Third Task');
    expect(sortedTasks[1].description).toBe('Second Task');
    expect(sortedTasks[2].description).toBe('First Task');
  });

  it('should handle Ascending + Completed Tasks + No Search Query', () => {
    state = taskReducer(state, { type: SET_SORT_ORDER, payload: SortType.ASCENDING });
    state = taskReducer(state, { type: SET_FILTER, payload: TaskStatus.COMPLETED });

    const { result } = renderHook(() => useFilteredTasks(state.tasks, state.filter, state.searchQuery));
    const sortedTasks = result.current;

    expect(sortedTasks.length).toBe(2);
    expect(sortedTasks[0].description).toBe('Third Task');
    expect(sortedTasks[1].description).toBe('First Task');
  });

  it('should handle Ascending + All Tasks + Search Query "second"', () => {
    state = taskReducer(state, { type: SET_SORT_ORDER, payload: SortType.ASCENDING });
    state = taskReducer(state, { type: SET_SEARCH_QUERY, payload: 'second' });

    const { result } = renderHook(() => useFilteredTasks(state.tasks, state.filter, state.searchQuery));
    const filteredTasks = result.current;

    expect(filteredTasks.length).toBe(1);
    expect(filteredTasks[0].description).toBe('Second Task');
  });

  it('should handle Descending + All Tasks + Search Query "first"', () => {
    state = taskReducer(state, { type: SET_SORT_ORDER, payload: SortType.DESCENDING });
    state = taskReducer(state, { type: SET_SEARCH_QUERY, payload: 'first' });

    const { result } = renderHook(() => useFilteredTasks(state.tasks, state.filter, state.searchQuery));
    const filteredTasks = result.current;

    expect(filteredTasks.length).toBe(1);
    expect(filteredTasks[0].description).toBe('First Task');
  });

  it('should handle Descending + Completed Tasks + Search Query "third"', () => {
    state = taskReducer(state, { type: SET_SORT_ORDER, payload: SortType.DESCENDING });
    state = taskReducer(state, { type: SET_FILTER, payload: TaskStatus.COMPLETED });
    state = taskReducer(state, { type: SET_SEARCH_QUERY, payload: 'third' });

    const { result } = renderHook(() => useFilteredTasks(state.tasks, state.filter, state.searchQuery));
    const filteredTasks = result.current;

    expect(filteredTasks.length).toBe(1);
    expect(filteredTasks[0].description).toBe('Third Task');
  });

  it('should handle Ascending + Incomplete Tasks + Search Query "second"', () => {
    state = taskReducer(state, { type: SET_SORT_ORDER, payload: SortType.ASCENDING });
    state = taskReducer(state, { type: SET_FILTER, payload: TaskStatus.INCOMPLETE });
    state = taskReducer(state, { type: SET_SEARCH_QUERY, payload: 'second' });

    const { result } = renderHook(() => useFilteredTasks(state.tasks, state.filter, state.searchQuery));
    const filteredTasks = result.current;

    expect(filteredTasks.length).toBe(1);
    expect(filteredTasks[0].description).toBe('Second Task');
  });

  it('should handle Completed Tasks + Search Query + Add New Task', () => {
    state = taskReducer(state, { type: SET_SORT_ORDER, payload: SortType.ASCENDING });
    state = taskReducer(state, { type: SET_FILTER, payload: TaskStatus.COMPLETED });
    state = taskReducer(state, { type: SET_SEARCH_QUERY, payload: 'third' });

    state = taskReducer(state, {
      type: ADD_TASK,
      payload: {
        id: '4',
        description: 'Fourth Task',
        createdAt: Date.now() + 4,
      },
    });

    state = taskReducer(state, {
      type: ADD_TASK,
      payload: {
        id: '5',
        description: 'Third Task Copy',
        createdAt: Date.now() + 3,
      },
    });

    const { result } = renderHook(() => useFilteredTasks(state.tasks, state.filter, state.searchQuery));
    const filteredTasks = result.current;

    expect(state.tasks.length).toBe(5);
    expect(filteredTasks.length).toBe(2);
    expect(filteredTasks[0].description).toBe('Third Task');
    expect(filteredTasks[1].description).toBe('Third Task Copy');
  });

  it('should filter tasks based on search query', () => {
    state = taskReducer(state, { type: SET_SEARCH_QUERY, payload: 'i task' });

    const { result } = renderHook(() => useFilteredTasks(state.tasks, state.filter, state.searchQuery));
    const filteredTasks = result.current;

    expect(filteredTasks.length).toBe(2);
    expect(filteredTasks[0].description).toBe('First Task'); // 'i' in 'First', matches both words
    expect(filteredTasks[1].description).toBe('Third Task'); // 'i' in 'Third', matches both words
  });
});