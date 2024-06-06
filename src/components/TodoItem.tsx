import React from 'react';
import { ListItem, Checkbox, IconButton, ListItemText } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

interface TodoItemProps {
  todo: { text: string; completed: boolean };
  index: number;
  toggleComplete: (index: number) => void;
  deleteTodo: (index: number) => void;
  editTodo: (index: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, index, toggleComplete, deleteTodo, editTodo }) => {
  return (
    <ListItem>
      <Checkbox
        checked={todo.completed}
        onChange={() => toggleComplete(index)}
      />
      <ListItemText
        primary={todo.text}
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      />
      <IconButton edge="end" onClick={() => editTodo(index)}>
        <EditIcon />
      </IconButton>
      <IconButton edge="end" onClick={() => deleteTodo(index)}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default TodoItem;
