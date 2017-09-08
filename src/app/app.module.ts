import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { routing } from './app.routing';

import { RecordsComponent } from './records/records.component';
import { RecordFormComponent } from './records/record-form/record-form.component';
import { RecordService } from './records/record.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    NotFoundComponent,
    RecordsComponent,
    RecordFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [
    RecordService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
