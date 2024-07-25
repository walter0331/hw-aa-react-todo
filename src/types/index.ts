export enum SortType {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}

export enum TaskStatus {
  COMPLETED = 'completed',
  INCOMPLETE = 'incomplete',
}

export type FilterOption = TaskStatus | null;  // Define FilterOption type

export interface Task {
  id: string;
  description: string;
  status: TaskStatus;
  createdAt: number;
}

export interface State {
  tasks: Task[];
  filter: FilterOption;
  sortOrder: SortType;
  searchQuery: string;
}

export interface Action {
  type: string;
  payload?: any;
}