import { Component, HostBinding} from '@angular/core';
import { Todo } from './Model/Todo';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  todos!: Todo[];
  copyOfTodos!: Todo[];
  currActiveFilterType: string = 'all';
  isDarkMode!: boolean;
  dragging = false;
  screenWidth!: number;

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    const storedTodos = localStorage.getItem('todos');
    this.todos = storedTodos
      ? (JSON.parse(storedTodos) as Todo[])
      : [
          { todo: 'Complete online JavaScript course', isActive: false },
          { todo: 'Jog around the park 3x', isActive: true },
          { todo: '10 minutes meditation', isActive: true },
          { todo: 'Read for 1 hour', isActive: true },
          { todo: 'Pick up groceries', isActive: true },
          { todo: 'Complete Todo App on Frontend Mentor', isActive: true },
        ];
    this.copyOfTodos = [...this.todos];
    const storedIsDarkMode = localStorage.getItem('isDarkMode');
    this.isDarkMode = storedIsDarkMode === 'true';
  }

  @HostBinding('class.dark')
  get darkModeClass() {
    return this.isDarkMode;
  }


  getItemsLeft() {
    return this.todos.filter((todo) => todo.isActive).length;
  }
  toggleTodo(todo: Todo) {
    todo.isActive = !todo.isActive;
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
  removeTodo(index: number) {
    this.todos.splice(index, 1);
    this.copyOfTodos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
  addTodo(inputTodo: string, input: HTMLInputElement) {
    if (inputTodo) {
      const result = this.todos.find(
        (todo) => todo.todo.toLowerCase() === inputTodo.toLowerCase()
      );
      if (result) console.log('Todo Already existed');
      else {
        this.todos.unshift({ todo: inputTodo, isActive: true });
        input.value = '';
      }

      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }

  filterTodo(sortType: string) {
    switch (sortType) {
      case 'all':
        this.todos = this.copyOfTodos;
        this.currActiveFilterType = 'all';
        break;
      case 'active':
        this.todos = this.copyOfTodos.filter((todo) => todo.isActive);
        this.currActiveFilterType = 'active';
        break;
      case 'completed':
        this.todos = this.copyOfTodos.filter((todo) => !todo.isActive);
        this.currActiveFilterType = 'completed';
        break;
    }
  }
  clearCompleted() {
    this.todos = this.todos.filter((todo) => todo.isActive);
    this.copyOfTodos = this.todos;
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('isDarkMode', `${this.isDarkMode}`);
  }

  onDrop(event: CdkDragDrop<Todo>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }
  onDragStarted() {
    this.dragging = true;
  }

  onDragEnded() {
    this.dragging = false;
  }

  getIndex(todo: Todo) {
    return this.todos.indexOf(todo);
  }
}
