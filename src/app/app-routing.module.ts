import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { InputFormComponent } from './input-form/input-form.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';


const routes: Routes = [
  { path: 'tasks' , component: TasksComponent },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'create', component: InputFormComponent},
  { path: 'task/:key', component: TaskDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
