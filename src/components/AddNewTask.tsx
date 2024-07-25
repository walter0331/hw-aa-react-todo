import React, { useState, useContext } from 'react';
import { Box, Flex, Button, Input } from '@chakra-ui/react';
import { TaskContext } from '../context/TaskContext';
import { ADD_TASK } from '../types/actionTypes';

let currentId = 1;

function guid(): string {
  return (currentId++).toString();
}

const AddNewTask: React.FC = () => {
  const { dispatch } = useContext(TaskContext);
  const [taskDescription, setTaskDescription] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (taskDescription.trim() === '') return;
    dispatch({
      type: ADD_TASK,
      payload: {
        id: guid(),
        description: taskDescription,
        createdAt: Date.now(),
      },
    });
    setTaskDescription('');
  };

  return (
    <Box as="form" onSubmit={handleSubmit} position="relative" mb={4}>
      <Flex mb={4}>
        <Input
          data-testid="add-task-input"
          placeholder="Enter task description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
      </Flex>
      <Flex justifyContent="right">
        <Button
          type="submit"
          data-testid="add-task-button"
          colorScheme="teal"
        >
          Add Task
        </Button>
      </Flex>
    </Box>
  );
};

export default AddNewTask;