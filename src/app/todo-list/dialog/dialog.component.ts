import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { task } from '../todo';
import { TodoService } from '../todo.service'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  myTask: task = { id: 0, name: "", description: "", done: false };

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,

    private _service: TodoService,
    private _form: FormBuilder,
  ) {

  }

  ngOnInit(): void {
  }

  addTask() {
    if(this.myTask.description == "" || this.myTask.name == ""){
      return;
    }
    console.log(this.myTask);
    this.dialogRef.close({ data: this.myTask });
  }

}
