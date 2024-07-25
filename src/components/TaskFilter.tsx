import React, { useContext } from 'react';
import { Select, Box } from '@chakra-ui/react';
import { TaskContext } from '../context/TaskContext';
import { FilterOption, TaskStatus } from '../types';

const TaskFilter: React.FC = () => {
  const { state, dispatch } = useContext(TaskContext);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as TaskStatus | '';
    const filter = value === '' ? null : value as FilterOption;
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  return (
    <Select value={state.filter || ''} onChange={handleFilterChange}>
      <option value="">All</option>  {/* Use empty string for All */}
      <option value={TaskStatus.COMPLETED}>Completed</option>
      <option value={TaskStatus.INCOMPLETE}>Incomplete</option>
    </Select>
  );
};

export default TaskFilter;