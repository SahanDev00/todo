import axios from 'axios'
const API_URL = 'http://localhost:5000/todos';

export const fetchTodos = () => axios.get(API_URL);
export const createTodo = (newTodo) => axios.post(API_URL, newTodo);
export const updateTodo = (id, updatedTodo) => axios.put(`${API_URL}/${id}`, updatedTodo);
export const deleteTodo = (id) => axios.delete(`${API_URL}/${id}`);
