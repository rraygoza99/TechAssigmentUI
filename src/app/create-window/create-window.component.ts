import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppComponent, TaskData } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { ApiHttpService } from '../app.service';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-create-window',
  templateUrl: './create-window.component.html',
  styleUrl: './create-window.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateWindowComponent implements OnInit {
  constructor(private apiService: ApiHttpService, private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ){}
  readonly dialogRef = inject(MatDialogRef<AppComponent>);
  taskForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }
  private initializeForm(): void {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      dueDate: [''],
    });
  }
  createTask(){
    if(this.taskForm.valid){
      this.taskForm.controls['dueDate'].setValue(this.datePipe.transform(this.taskForm.controls['dueDate'].value, 'yyyy-MM-dd'));
      this.apiService.createTask(this.taskForm.value).subscribe(response=>{
        this.dialogRef.close();
      },
      error => {
        console.error('API Error:', error);  
      });
    }    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
