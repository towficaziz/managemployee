import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeManage } from '../models/employee-manage.model';
@Injectable({
  providedIn: 'root'
})
export class EmployeeManageService {

  baseUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) { }

  getEmployee(){
    return this.http.get<EmployeeManage[]>(this.baseUrl);
  }

  postEmployee(employee:EmployeeManage){
    return this.http.post<EmployeeManage>(this.baseUrl, employee);
  }

  deleteEmployee(id: string){
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
