import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {from} from 'rxjs';
import {Model} from '../../model/model';
import * as moment from 'moment';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css'],
  providers: [DatePipe]
})
export class InputFormComponent implements OnInit {

  todoListForm: FormGroup;
  listData = JSON.parse(localStorage.getItem('list'));
  model = new Model('', '', '', false);
  formError = {
    title: '',
    memo: '',
    closedDate: '',
    closedStatus: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    public router : Router
    ) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.todoListForm = this.formBuilder.group({
      title: [this.model.title, [Validators.required]],
      memo: [this.model.memo, [Validators.required]],
      closedDate: [this.model.closedDate, [Validators.required]],
      closedStatus: [this.model.closedStatus, [Validators.required]]
    });
    Object.keys(this.formError).forEach(key => {
      if (this.todoListForm.get(key) && this.todoListForm.get(key).errors) {
        this.formError[key] = this.todoListForm.get(key).errors;
      } else {
        this.formError[key] = '';
      }
    });
    if (this.checkError() && this.validDate()) {
      this.listData.push(this.todoListForm.value);
      localStorage.setItem('list', JSON.stringify(this.listData));
      console.log(this.todoListForm);
      this.model = new Model('', '', '', false );
      console.log(this.formError);
      this.router.navigate(['/']);
    }
  }

  checkError() {
    for (const key in this.formError) {
      if (this.formError[key] !== '') {
        return false;
      }
    }
    return true;
  }
  validDate() {
    if (this.todoListForm && moment(this.todoListForm.value.closedDate).isAfter(new Date())) {
      return true;
    }
    return false;
  }
}
