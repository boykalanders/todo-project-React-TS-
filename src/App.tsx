import React from 'react';
import { Container, Typography } from '@mui/material';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        To-Do List
      </Typography>
      <TodoList />
    </Container>
  );
};

export default App;
