import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  public tasks: { taskName: string; isCompleted: boolean }[] = [
    { taskName: 'Brush teeth', isCompleted: false },
  ];

  constructor() {}

  public ngOnInit(): void {}

  public onSubmit(form: NgForm): void {
    this.tasks.push({
      taskName: form.controls['task'].value,
      isCompleted: false,
    });
    form.resetForm();
  }

  public onDelete(index: number): void {
    this.tasks.splice(index, 1);
  }

  public onToggle(index: number): void {
    this.tasks[index].isCompleted = !this.tasks[index].isCompleted;
  }
}
