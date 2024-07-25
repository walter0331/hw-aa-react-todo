import React, { useContext } from 'react';
import { Select } from '@chakra-ui/react';
import { TaskContext } from '../context/TaskContext';
import { FilterOption, TaskStatus } from '../types';

const TaskFilter: React.FC = () => {
  const { state, dispatch } = useContext(TaskContext);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const filter: FilterOption = value === 'all' ? null : (value as TaskStatus);
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  return (
    <Select value={state.filter ?? 'all'} onChange={handleFilterChange}>
      <option value="all">Show All Tasks</option>
      <option value={TaskStatus.COMPLETED}>Show Completed Tasks</option>
      <option value={TaskStatus.INCOMPLETE}>Show Incomplete Tasks</option>
    </Select>
  );
};

export default TaskFilter;