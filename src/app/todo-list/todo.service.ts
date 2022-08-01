import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { task } from './todo'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  url = 'http://localhost:3000/tasks';

  constructor(private _http: HttpClient) { }

  getTasks() {
    return this._http.get<task[]>(this.url);
  }

  updateDone(t: task){
    return this._http.put(this.url + '/' + t.id, {...t});
  }

  deleteTask(id: number){
    return this._http.delete(this.url + '/' + id);
  }

}
