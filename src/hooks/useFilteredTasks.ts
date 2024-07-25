import { useMemo } from 'react';
import { Task, TaskStatus, FilterOption } from '../types';


// Combine filter and search query for a streaghtforward solution and to avoid multiple loops
// Slightly more complex due to the combined logic, but still manageable.
const useFilteredTasks = (tasks: Task[], filter: FilterOption, searchQuery: string = ''): Task[] => {
  return useMemo(() => {

    return tasks.filter(task => {

      // Filter tasks based on status
      const matchesStatus = (() => {
        switch (filter) {
          case TaskStatus.COMPLETED:
            return task.status === TaskStatus.COMPLETED;
          case TaskStatus.INCOMPLETE:
            return task.status === TaskStatus.INCOMPLETE;
          case null:
          default:
            return true;
        }
      })();

      // Filter tasks based on search query
      // Normalize search query: split by whitespace and convert to lowercase
      const trimmedSearchQuery = searchQuery.trim();

      // Split search query into individual terms, checking for empty strings to avoid empty terms 
      // 1. ''split(/\s+/) will generate an empty string if the search query is empty or only contains whitespace 
      // 2. 'Term1 Term2'.split(/\s+/) will generate ['Term1', 'Term2']
      const searchTerms = trimmedSearchQuery
        ? trimmedSearchQuery.toLowerCase().split(/\s+/)
        : [];

      const matchesSearch = searchTerms.every(
        term => task?.description.toLowerCase().includes(term)
      );

      return matchesStatus && matchesSearch;
    });
  }, [tasks, filter, searchQuery]);
};

export default useFilteredTasks;