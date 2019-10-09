import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { DatePipe } from '@angular/common';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [DatePipe]
})
export class TasksComponent implements OnInit {
  tasks: Task[] ;
  now = new Date();
  selectedTask: Task;
  closeResult: string;
  modalReference: any;
  constructor(
    private taskService: TaskService,
    private modalService: NgbModal,
    private route : ActivatedRoute,
    private router : Router 
  ) {
    // this.sortedTask = this.tasks.slice();
  }

  ngOnInit() {
    this.getTasks();
  }
  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => {
        this.tasks = tasks;
        for (const task of this.tasks) {
        const myDate = new Date(task.closedDate);
        if (myDate < this.now) { task.time_out = true; }
        else task.time_out = false;
        }
      });
  }
// Code them
  open(content, task: Task) {
    this.selectedTask = task;
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    } 
  }


  changeStatus(): void {
    let isCheck = document.getElementById("check_closed") as HTMLInputElement;
    if(isCheck != null && isCheck.checked){
    let task_saved = JSON.parse(localStorage.getItem('list'));
    const key = task_saved.findIndex( task_saved => task_saved.id === this.selectedTask.id);
    task_saved[key].closedStatus = true;
    localStorage.setItem('list', JSON.stringify(task_saved));
    window.location.href="/tasks";
    }
    this.modalReference.close();
  }

  delete(): void {
    if(confirm("Bạn có chắc chắn muốn xóa không?")) {
      let task_saved = JSON.parse(localStorage.getItem('list'));
      const key = task_saved.findIndex( task_saved => ( task_saved.id === this.selectedTask.id));
      task_saved.splice(key, 1);
      localStorage.setItem('list', JSON.stringify(task_saved));
      window.location.href="/tasks"; 
    }
    
  }

  sortTable(n) {
  let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById('table1');
  switching = true;

  dir = 'asc';
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName('TD')[n];
      y = rows[i + 1].getElementsByTagName('TD')[n];
      if (dir === 'asc') {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir === 'desc') {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount === 0 && dir === 'asc') {
        dir = 'desc';
        switching = true;
      }
    }
  }
  }
}

