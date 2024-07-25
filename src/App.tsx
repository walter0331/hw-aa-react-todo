import React from 'react';
import { Box, Heading, Container } from '@chakra-ui/react';
import TaskList from './components/TaskList';
import AddNewTask from './components/AddNewTask';

// import './App.css';

const App: React.FC = () => {
  return (
    <Container maxW="container.md" p={4}>
      <Box textAlign="center" mb={4}>
        <Heading as="h1">Todo List</Heading>
      </Box>
      <AddNewTask />
      <TaskList />
    </Container>
  );
};

export default App;
