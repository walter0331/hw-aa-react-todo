import React, { useContext } from 'react';
import { Select, Box } from '@chakra-ui/react';  // Import Select from Chakra UI
import { TaskContext } from '../context/TaskContext';
import { SortType } from '../types';
import { SET_SORT_ORDER } from '../types/actionTypes';

const SortOrderSelector: React.FC = () => {
  const { state, dispatch } = useContext(TaskContext);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: SET_SORT_ORDER, payload: event.target.value as SortType });
  };

  return (
    <Select value={state.sortOrder} onChange={handleSortChange}>
      <option value={SortType.ASCENDING}>Sort by Creation Time (Ascending)</option>
      <option value={SortType.DESCENDING}>Sort by Creation Time (Descending)</option>
    </Select>
  );
};

export default SortOrderSelector;