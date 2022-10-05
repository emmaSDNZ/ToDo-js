import { Todo, TodoList } from './assets/clases';
import { crearTodoHTML } from './js/componentes';

import './styles.css';


export const todoList = new TodoList();

todoList.todos.forEach( crearTodoHTML );
const newTodo = new Todo("hacer PI")
//todoList.nuevoTodo(newTodo) 
//newTodo.imprimirClase()
todoList.todos[0].imprimirClase();
