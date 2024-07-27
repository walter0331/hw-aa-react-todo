import React, { useState } from 'react';
import { Checkbox, Text, Box, Button, Input, Flex } from '@chakra-ui/react';
import { Task, TaskStatus } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, description: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = React.memo(({ task, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(task.description);
  const isChecked = task.status === TaskStatus.COMPLETED;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewDescription(task.description);
  };

  const handleSave = () => {
    onUpdate(task.id, newDescription);
    setIsEditing(false);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" p={4} borderWidth="1px" borderRadius="md" mb={2}>

      {isEditing ? (
        <Flex flex={1}>
          <Input
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            flex={1}
            width="100%"
            mr={2}
          />
          <Button colorScheme="teal" onClick={handleSave}>Save</Button>
          <Button ml={2} onClick={handleCancel}>Cancel</Button>
        </Flex>
      ) : (
        <Checkbox isChecked={isChecked} onChange={() => onToggle(task.id)}>
          <Text as={isChecked ? 's' : undefined}>{task.description}</Text>
        </Checkbox>
      )}

      {!isEditing && (
        <Flex justifyContent="right">
          <Button colorScheme="blue" onClick={handleEdit}>  
            Edit
          </Button>
          <Button colorScheme="red" ml={2} onClick={() => onDelete(task.id)}>
            Delete
          </Button>
        </Flex>
      )}
    </Box>
  );
});

export default TaskItem;