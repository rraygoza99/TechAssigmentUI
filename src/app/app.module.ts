import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MatListModule } from '@angular/material/list';
import { ApiHttpService } from './app.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditModalComponent } from './editWindow/edit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateWindowComponent } from './create-window/create-window.component';
import { DatePipe } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    EditModalComponent,
    CreateWindowComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatListModule,
    MatCheckboxModule,
    MatDividerModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatDatepickerModule
  ],
  providers: [
    ApiHttpService,
    DatePipe,
    provideNativeDateAdapter()
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }