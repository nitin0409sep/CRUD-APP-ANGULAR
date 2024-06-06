import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditEmployeeComponent } from './add-edit-employee/add-edit-employee.component';
import { EmployeeService } from './services/employee.service';

import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from './snackbarService/snackbar-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'crud-app';

  dataSource!: MatTableDataSource<any>;

  // Table Columns
  public displayedColumns: string[] = [
    "id", "fname", "lname", "email", "dob", "gender",
    "education", "company", "experience", "package", "action"
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private employeeService: EmployeeService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  // Add Employee Button
  openAddEditEmployeeForm() {
    const dialogRef = this.dialog.open(AddEditEmployeeComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.snackbar.openSnackBar("Employee Added Successfully", '');
          this.getEmployeeList();
        }
      }
    })
  }

  // Get Employee List
  public getEmployeeList() {
    this.employeeService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(Object.values(res));
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => { this.snackbar.openSnackBar("Something went wrong", ''); }
    });
  }

  // Edit Employee
  public openEditEmployee(data: any) {
    const dialogRef = this.dialog.open(AddEditEmployeeComponent, {
      data: data
    })

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.snackbar.openSnackBar("Employee Updated Successfully", '');
          this.getEmployeeList();
        }
      }
    })
  }

  // Delete Employee
  public deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (res) => {
        this.snackbar.openSnackBar("Employee Deleted Successfully", '');
        this.getEmployeeList();
      },
      error: (err) => {
        this.snackbar.openSnackBar("Something went wrong", '');
      },
    });
  }


  // Filter Search
  public applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
