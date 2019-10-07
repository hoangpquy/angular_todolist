import { Injectable } from '@angular/core';
import { Task } from './task';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  task_saved: Task[];

  constructor() {

   }

  getTasks(): Observable<Task[]> {
    this.task_saved = JSON.parse(localStorage.getItem('list'));
      return of(this.task_saved);
  }

  getTask(key: number): Observable<Task> {
    return of(this.task_saved[key]);
  }
}
