import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgFor, DatePipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatList, MatListModule } from '@angular/material/list';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpEvent } from '@angular/common/http';
import { ApiHttpService } from './app.service';
import { MatDialog } from '@angular/material/dialog';
import { EditModalComponent } from './editWindow/edit.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CreateWindowComponent } from './create-window/create-window.component';

export interface TaskData{
  name: string;
  isCompleted: boolean;
  dueDate: Date;
  description: string;
  id: number;
}

const url= "https://localhost:44314/api";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private apiService: ApiHttpService){

  }
  title = 'TechAssigment';
  tasks:any[]=[];
  today = new Date();
  readonly dialog = inject(MatDialog);
  
  ngOnInit():void{
    this.getTasks();
  }

  private getTasks(){
    this.apiService.get(url+"/task").subscribe(response=>{
      this.tasks = [];
      this.tasks.push(response.valueOf());
    }, error=> {
      console.error(error);
    });
  }
  isDueDateGreaterThanToday(dueDate: Date, isCompleted: boolean): boolean {
    return new Date(dueDate) < this.today && !isCompleted;
  }
  onCompletedChange(id: number, event: MatCheckboxChange){
    const checked = event.checked;
    this.apiService.changeState(id.toString(), checked.toString()).subscribe(response=>{
      this.getTasks();

    });
  }


  openDialog(id: number): void {
    const dialogRef = this.dialog.open(EditModalComponent, {
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTasks();
      if (result !== undefined) {
      }
    });
  }
  openCreateDialog(): void{
    const dialogRef = this.dialog.open(CreateWindowComponent,{

    });
    dialogRef.afterClosed().subscribe(result => {
      this.getTasks();
      if (result !== undefined) {
      }
    });
  }
}
