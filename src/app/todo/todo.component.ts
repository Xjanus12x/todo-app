import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Todo } from '../Model/Todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class TodoComponent {
  @Input() todo!: Todo;
  @Input() isDarkMode!: boolean;
  removeTodo(i: number) {}
}
