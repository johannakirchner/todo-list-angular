import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    @Inject(MAT_DIALOG_DATA) public data: task,
    public dialogRef: MatDialogRef<DialogComponent>,
    private _service: TodoService,
    private _form: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.myTask.id = this.data.id;
    this.myTask.description = this.data.description;
    this.myTask.name = this.data.name;
    this.myTask.done = this.data.done;
  }

  saveTask() {
    if (this.myTask.description == "" || this.myTask.name == "") {
      return;
    }
    this.dialogRef.close({ data: this.myTask });
  }

}
