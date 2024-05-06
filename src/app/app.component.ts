import { Component, HostBinding, inject } from '@angular/core';
import { Todo } from './Model/Todo';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

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
  constructor(private dialog: MatDialog) {}

  ngOnInit() {
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
  removeTodo(isRemoving: boolean, index: number) {
    if (isRemoving) {
      const dialogRef = this.dialog.open(DialogBoxComponent, {
        maxWidth: '300px',
        data: {
          title: 'Confirm Delete',
          message: 'Are you sure you want to delete this todo?',
          isDelete: true,
        },
      });

      dialogRef.afterClosed().subscribe({
        next: (result: boolean) => {
          if (result) {
            this.todos.splice(index, 1);
            this.copyOfTodos.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(this.todos));
          }
        },
      });
    }
  }
  addTodo(inputTodo: string, input: HTMLInputElement) {
    if (inputTodo) {
      const result = this.todos.find(
        (todo) => todo.todo.toLowerCase() === inputTodo.toLowerCase()
      );
      if (result) {
        this.dialog.open(DialogBoxComponent, {
          maxWidth: '300px',
          data: {
            title: 'Todo Already Exists',
            message:
              'The todo you entered already exists. Please enter a different todo.',
            isDelete: false,
          },
        });
        return;
      } else {
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
