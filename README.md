# Todo List Application

### Live Demo

[https://wc-hw-aa-react-todo.surge.sh/](https://wc-hw-aa-react-todo.surge.sh/)

## Features

- **Add Tasks**: Users can add tasks with a short description.
- **View Tasks**: Users can view a list of all tasks, both completed and uncompleted.
- **Toggle Task Status**: Users can mark tasks as completed or uncompleted.
- **Delete Tasks**: Users can delete tasks.
- **Update Task Description**: Users can update the description of existing tasks.
- **Sort Tasks**: Users can sort tasks by creation time.
- **Filter/Search Tasks**: Users can filter or search tasks based on specific criteria.
- **Responsive UI**: The application is responsive and works well on various devices.

## Project Structure
```
src/
  App.tsx
  components/
    AddNewTask.tsx
    SearchFilter.tsx
    SortOrderSelector.tsx
    TaskFilter.tsx
    TaskItem.tsx
    TaskList.tsx
  context/
    TaskContext.tsx
  hooks/
    useFilteredTasks.ts
  reducers/
    taskReducer.test.ts
    taskReducer.ts
  tests/
    intergration/
      reducerAndHooks.test.tsx
  types/
    actionTypes.ts
    index.ts
```

### Codebase Architecture

- **Components**: Reusable UI components located in the [`src/components`](src/components) directory.
- **Context**: Context API for state management located in the [`src/context`](src/context) directory.
- **Reducers**: Reducer functions for managing state located in the [`src/reducers`](src/reducers) directory.
- **Hooks**: Custom hooks located in the [`src/hooks`](src/hooks) directory.
- **Types**: TypeScript type definitions located in the [`src/types`](src/types) directory.

### Key Components

- **App.tsx**: The main component that renders the application layout.
- **TaskList.tsx**: Displays the list of tasks.
- **TaskItem.tsx**: Represents an individual task item with options to edit, delete, and toggle its status.
- **AddNewTask.tsx**: A form to add new tasks.
- **TaskFilter.tsx**: Provides filtering options for tasks.
- **SearchFilter.tsx**: Allows users to search tasks.
- **SortOrderSelector.tsx**: Allows users to sort tasks by creation time.

### State Management

- **TaskContext.tsx**: Provides the context for managing tasks.
- **taskReducer.ts**: Contains the reducer logic for handling task-related actions.

### Custom Hooks

- **useFilteredTasks.ts**: A custom hook for filtering tasks based on the selected criteria.

### Types

- **index.ts**: Defines TypeScript types used across the application.
- **actionTypes.ts**: Defines action types for the reducer.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Install dependencies:
```sh
npm install
# or
yarn install
```

### Running the Application
To start the application in development mode, run:
```sh
npm start
# or
yarn start
```
Open http://localhost:3000 to view it in the browser.

### Running Tests
To run the test suite, use:
```
npm test
# or
yarn test
```

### Building the Application
```
npm run build
# or
yarn build
```
The build artifacts will be stored in the build directory.
