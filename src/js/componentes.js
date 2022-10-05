import { Todo } from "../assets/clases";
import {todoList} from '../index.js'

//hacemos la referencia al elemento html
const divTodoList   = document.querySelector('.todo-list')
const textInput     = document.querySelector('.new-todo')
const btnBorrar     = document.querySelector('.clear-completed')
const ulFiltros     = document.querySelector('.filters')

export const crearTodoHTML = (todo) => {
    
    const todoHTML = `
        <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
			<div class="view">
				<input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
				<label>${todo.tarea}</label>
				<button class="destroy"></button>
			</div>
			<input class="edit" value="Create a TodoMVC template">
	    </li> 
    `
    const div = document.createElement('div');
    div.innerHTML = todoHTML;
    divTodoList.append(div.firstElementChild)
    return div.firstElementChild
}

//EVENTOS

textInput.addEventListener('keyup', (e)=>{
    //primero agarro el valor y lo agrego a mi array de tareas.

    if(e.keyCode === 13 && textInput.value.length > 0){
        const nuevoTodo  = new Todo(textInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHTML(nuevoTodo);
        textInput.value= '';
        
        
    }
    
})

divTodoList.addEventListener('click', (e)=>{

   
    const nombreElement = e.target.localName;
   
    const todoElement = e.target.parentElement.parentElement;
    
    const todoId = todoElement.getAttribute('data-id')
    

    if( nombreElement.includes('input')){
        todoList.marcarCompletado(todoId)
        todoElement.classList.toggle('completed');

    } else if ( nombreElement.includes('button')){
        todoList.eliminarCompletados(todoId);
        divTodoList.removeChild( todoElement)

    }
})

btnBorrar.addEventListener('click',() =>{
    todoList.eliminarCompletados()

    for( let i = divTodoList.children.length-1; i >= 0; i-- ) {

        const elemento = divTodoList.children[i];

        if( elemento.classList.contains('completed') ){
            divTodoList.removeChild(elemento);
        }

    }
})

ulFiltros.addEventListener('click', (e)=>{

    const filtro = e.target.text;
    if (!filtro) return;

    for(const elemento of divTodoList.children){
        
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed')
        switch(filtro){
            case'Pendientes':
                if( completado ){
                    elemento.classList.add('hidden')
                }
            break;
            case 'Completados':
                if( !completado ){
                    elemento.classList.add('hidden')
                }
                
        }
    }
   
} )