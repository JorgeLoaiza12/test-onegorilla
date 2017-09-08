import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Record } from '../record'


@Injectable()

export class RecordService {
  records: Record[];
  errorForm: '';

 constructor(private http: Http) {
  this.errorForm;
 }

 private headers = new Headers({ 'Content-Type': 'application/json' });
 private recordsUrl = 'http://localhost:3000/api/records';

 getRecords(): Promise<Record[]> {
   return this.http.get(this.recordsUrl)
     .toPromise()
     .then(response => response.json().data as Record[] )
     .catch(this.handleError);
     
 }


 createRecord(record: Record): Promise<Record> {
   console.log(record);
   return this.http
     .post(this.recordsUrl, record)
     .toPromise()
     .then(res => {
      res.json().data as Record
     })
     .catch(this.handleError);
 }

  private handleError(error: any): Promise<any> {
    const error2 = JSON.parse(error["_body"]);
    return Promise.reject(error2.message || error);
  }
}