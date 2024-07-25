import { useMemo } from 'react';
import { Task, TaskStatus, FilterOption } from '../types';

const useFilteredTasks = (tasks: Task[], filter: FilterOption): Task[] => {
  return useMemo(() => {
    switch (filter) {
      case TaskStatus.COMPLETED:
        return tasks.filter(task => task.status === TaskStatus.COMPLETED);
      case TaskStatus.INCOMPLETE:
        return tasks.filter(task => task.status === TaskStatus.INCOMPLETE);
      case null:
      default:
        return tasks;
    }
  }, [tasks, filter]);
};

export default useFilteredTasks;