import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Todo } from '../Model/Todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  @Input() todo!: Todo;
  @Input() isDarkMode!: boolean;
  @Output() isRemoving = new EventEmitter<boolean>();

  removeTodo() {
    this.isRemoving.emit(true);
  }
}
