import { Component, effect, inject, OnInit, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TodoStore } from '../store/todo.store';
import { SnackbarComponent } from '../snackbar-component/snackbar.component';

@Component({
  selector: 'app-todo-list',
  imports: [FormsModule, SnackbarComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  public store = inject(TodoStore);
  public snackBar = viewChild.required(SnackbarComponent);

  constructor() {
    effect(() => {
      if (this.store.todos().every((item) => item.isCompleted)) {
        this.snackBar().show();
      }
    });
  }

  public ngOnInit(): void {}

  public onSubmit(form: NgForm): void {
    this.store.addTodo(form.controls['task'].value);
    form.resetForm();
  }

  public onDelete(id: string): void {
    this.store.deleteTodo(id);
  }

  public onToggle(id: string): void {
    this.store.toggleTodo(id);
  }
}
