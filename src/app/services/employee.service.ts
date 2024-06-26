import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  // Post Employee
  addEmployee(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/employees', data);
  }

  // Get Employee
  getEmployeeList(): Observable<any> {
    return this.http.get('http://localhost:3000/employees');
  }

  // Edit Employee
  updateEmployee(id: number, data: any) {
    return this.http.put(`http://localhost:3000/employees/${id}`, data);
  }

  // Delete Employee
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/employees/${id}`);
  }

}

