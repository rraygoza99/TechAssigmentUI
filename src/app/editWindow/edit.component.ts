import { Component, inject, OnInit } from "@angular/core";
import { AppComponent, TaskData } from "../app.component";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ApiHttpService } from "../app.service";
const url= "https://localhost:44314/api";
@Component({
    selector: 'editModal',
    templateUrl: 'edit.component.html'
  })
  export class EditModalComponent implements OnInit {
    constructor(private apiService: ApiHttpService){

    }
    readonly dialogRef = inject(MatDialogRef<AppComponent>);
    readonly data = inject<TaskData>(MAT_DIALOG_DATA);
    name: string ="";
    description: string ="";
    dueDate: Date=new Date();
    isCompleted: boolean=false;
    ngOnInit(){
        this.apiService.getById(url+`/task/${this.data.id}`).subscribe(response=>{
            console.log(response);
            this.name = response.name;
            this.description = response.description;
            this.dueDate = response.dueDate;
            this.isCompleted = response.isCompleted;
        });
    }
    updateTask(){
        const task: TaskData={
            description: this.description,
            name: this.name,
            id: this.data.id,
            isCompleted: this.isCompleted,
            dueDate: this.dueDate
        };
        this.apiService.updateTask(url+"/task", task).subscribe(response=>{
            this.dialogRef.close();
        });
    }
    
    onNoClick(): void {
      this.dialogRef.close();
    }
  }