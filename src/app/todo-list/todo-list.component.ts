import { ContentObserver } from '@angular/cdk/observers';
import { Component, OnInit } from '@angular/core';
import { task } from './todo'
import { TodoService } from './todo.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  tasks!: task[];

  constructor(
    private _service: TodoService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this._service.getTasks().subscribe({
      next: (r) => {
        this.tasks = r;
      }

    });
  }

  updateTask(t: task) {
    this._service.updateDone(t).subscribe({
      next: (r) => {
        this.getTasks();
      }
    });
  }

  deleteTask(id: number) {

    this._service.deleteTask(id).subscribe({
      next: (r) => {
        this.tasks = this.tasks.filter(task => task.id !== id)
      }
    })
  }

  addTask(t: task) {
    if (this.tasks.length < 1) {
      t.id = 0;
    }
    else {
      let i = this.tasks[this.tasks.length - 1].id + 1
      t.id = i
    }
    this._service.addTask(t).subscribe({
      next: (r) => {
        this.getTasks();
      }
    });

  }

  openAdd() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '20%',
      data: { id: 0, name: "", description: "", done: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.addTask(result.data);
    })

  }

  openEdit(task: task) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { id: task.id, name: task.name, description: task.description, done: task.done }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateTask(result.data);
    })

  }

}
