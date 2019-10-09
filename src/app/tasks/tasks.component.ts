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
  isChecked = false;

  constructor(
    private taskService: TaskService,
    private modalService: NgbModal,
    private route : ActivatedRoute,
    private router : Router 
  ) {
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
    if(this.isChecked){
    const task = this.tasks.find( task_saved => task_saved.id === this.selectedTask.id);
    task.closedStatus = true;
    localStorage.setItem('list', JSON.stringify(this.tasks));
    }
    this.modalReference.close();
  }

  delete(): void {
    if(confirm("Bạn có chắc chắn muốn xóa không?")) {
      this.tasks = this.tasks.filter(item => item.id !== this.selectedTask.id);
      localStorage.setItem('list', JSON.stringify(this.tasks));
      this.modalReference.close();
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

