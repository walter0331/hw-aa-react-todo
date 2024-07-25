import React, { useContext, useCallback } from 'react';
import { Input, Box } from '@chakra-ui/react';
import { TaskContext } from '../context/TaskContext';
import { debounce } from 'lodash';

const DEBOUNCE_DELAY = 250;

const SearchFilter: React.FC = () => {
  const { dispatch } = useContext(TaskContext);

  const debouncedSetSearchQuery = useCallback(
    debounce((query: string) => {
      dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
    }, DEBOUNCE_DELAY),
    []
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearchQuery(event.target.value);
  };

  return (
    <Input
      placeholder="Search tasks"
      onChange={handleSearchChange}
      mb={4}
    />
  );
};

export default SearchFilter;