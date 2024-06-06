import React, { useState, useEffect } from 'react';
import { List, TextField, Button, Box, ButtonGroup } from '@mui/material';
import TodoItem from './TodoItem';

interface Todo {
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleComplete = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const editTodo = (index: number) => {
    const newTodos = [...todos];
    const editedText = prompt('Edit the task', newTodos[index].text);
    if (editedText !== null) {
      newTodos[index].text = editedText;
      setTodos(newTodos);
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'incomplete') return !todo.completed;
    return true;
  });

  return (
    <Box>
      <TextField
        variant="outlined"
        placeholder="Add a new to-do item..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={addTodo} fullWidth>
        Add
      </Button>
      <ButtonGroup variant="contained" fullWidth>
        <Button onClick={() => setFilter('all')}>All</Button>
        <Button onClick={() => setFilter('completed')}>Completed</Button>
        <Button onClick={() => setFilter('incomplete')}>Incomplete</Button>
      </ButtonGroup>
      <List>
        {filteredTodos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            index={index}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        ))}
      </List>
    </Box>
  );
};

export default TodoList;
