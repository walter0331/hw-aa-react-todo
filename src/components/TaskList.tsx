import React, { useContext, useCallback } from 'react';
import { TaskContext } from '../context/TaskContext';
import useFilteredTasks from '../hooks/useFilteredTasks';
import TaskItem from './TaskItem';
import SortOrderSelector from './SortOrderSelector';
import TaskFilter from './TaskFilter';
import SearchFilter from './SearchFilter';
import { Box, List, ListItem } from '@chakra-ui/react';

const TaskList: React.FC = () => {
  const { state, dispatch } = useContext(TaskContext);

  const filteredTasks = useFilteredTasks(state.tasks, state.filter, state.searchQuery);

  const handleToggle = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  }, [dispatch]);

  const handleDelete = useCallback((id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  }, [dispatch]);

  const handleUpdate = useCallback((id: string, description: string) => {
    dispatch({ type: 'UPDATE_TASK', payload: { id, description } });
  }, [dispatch]);

  return (
    <Box>
      <Box mb={4}>
        <SortOrderSelector />
      </Box>
      <Box mb={4}>
        <TaskFilter />
      </Box>
      <Box mb={4}>
        <SearchFilter />
      </Box>
      <List mt={4}>
        {filteredTasks.map(task => (
          <ListItem key={task.id}>
            <TaskItem
              task={task}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TaskList;