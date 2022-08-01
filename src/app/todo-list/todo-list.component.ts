import { ContentObserver } from '@angular/cdk/observers';
import { Component, OnInit } from '@angular/core';
import { task } from './todo'
import { TodoService } from './todo.service'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  tasks!: task[];

  constructor(private _service: TodoService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(){
    this._service.getTasks().subscribe({
      next: (r) => {
        this.tasks = r;
      }
    });
  }

  updateDone(t: task) {
    this._service.updateDone(t).subscribe({
      next: (r) => {   
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

  editTask(id: number) {

  }
}
