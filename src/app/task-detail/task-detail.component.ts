import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task : Task;
  constructor(
    private taskService : TaskService,
    private route : ActivatedRoute,
    private router : Router 
  ) { }

  ngOnInit() {
    this.getTask();
  }

  getTask() : void {
    const key = +this.route.snapshot.paramMap.get('key');
    this.taskService.getTask(key).subscribe(task => this.task = task);
  }

  goBack(): void {
    this.router.navigate(['/tasks']);
  }

  changeStatus(check: any): void {
    const key = +this.route.snapshot.paramMap.get('key');
    let task_saved = JSON.parse(localStorage.getItem('list')); 
    task_saved[key].closedStatus = check;
    localStorage.setItem('list', JSON.stringify(task_saved));
    this.router.navigate(['/']);
  }

  delete(): void {
    if(confirm("Are you sure?")) {
      const key = +this.route.snapshot.paramMap.get('key');
      let task_saved = JSON.parse(localStorage.getItem('list'));
      task_saved.splice(key, 1);
      localStorage.setItem('list', JSON.stringify(task_saved));
      this.router.navigate(['/']);
    }
    
  }
}
