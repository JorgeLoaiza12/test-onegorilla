import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Record } from '../record';
import { RecordService } from './record.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: []
})
export class RecordsComponent implements OnInit {
  records: Record[];
  newRecord: Record;
  errorForm;

  constructor(private router: Router, private recordService: RecordService) {
    this.errorForm = "";
  }

  ngOnInit() {
    this.recordService.getRecords().then(records => this.records = records);
    this.newRecord = new Record();
  }

  createRecord(record: Record): void {
    this.recordService.createRecord(record)
      .then(record => {
        this.records.push(record);
      })
      .catch(err => {
        this.errorForm = err;
        console.log(this.errorForm);
      });
  }
}