import { taskReducer } from './taskReducer';
import { TaskStatus, SortType } from '../types';
import { UPDATE_TASK, SET_SORT_ORDER, SET_FILTER, SET_SEARCH_QUERY } from '../types/actionTypes';

const createInitialState = (overrides = {}) => ({
  tasks: [],
  sortOrder: SortType.ASCENDING,
  filter: null,
  searchQuery: '',
  ...overrides,
});

describe('taskReducer', () => {
  it('should update the task description when handling UPDATE_TASK', () => {
    const initialState = createInitialState({
      tasks: [{ id: '1', description: 'Task 1', status: TaskStatus.INCOMPLETE, createdAt: Date.now() }],
    });
    const action = { type: UPDATE_TASK, payload: { id: '1', description: 'Updated Task' } };
    const state = taskReducer(initialState, action);
    expect(state.tasks[0].description).toBe('Updated Task');
  });

  it('should set the sort order and sort tasks when handling SET_SORT_ORDER', () => {
    const initialState = createInitialState({
      tasks: [
        { id: '1', description: 'Task 1', status: TaskStatus.INCOMPLETE, createdAt: Date.now() },
        { id: '2', description: 'Task 2', status: TaskStatus.INCOMPLETE, createdAt: Date.now() + 1 },
      ],
    });
    const action = { type: SET_SORT_ORDER, payload: SortType.DESCENDING };
    const state = taskReducer(initialState, action);
    expect(state.sortOrder).toBe(SortType.DESCENDING);
    expect(state.tasks[0].id).toBe('2');
    expect(state.tasks[1].id).toBe('1');
  });

  it('should set the filter when handling SET_FILTER', () => {
    const initialState = createInitialState();
    const action = { type: SET_FILTER, payload: TaskStatus.COMPLETED };
    const state = taskReducer(initialState, action);
    expect(state.filter).toBe(TaskStatus.COMPLETED);
  });

  it('should set the search query when handling SET_SEARCH_QUERY', () => {
    const initialState = createInitialState();
    const action = { type: SET_SEARCH_QUERY, payload: 'search term' };
    const state = taskReducer(initialState, action);
    expect(state.searchQuery).toBe('search term');
  });

  it('should return the initial state for unknown action types', () => {
    const initialState = createInitialState();
    const action = { type: 'UNKNOWN_ACTION' };
    const state = taskReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});