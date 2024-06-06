import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { SnackbarService } from '../snackbarService/snackbar-service.service';
 
@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {

  // Education Selection
  education: string[] = ['Matric', 'Diploma', 'Intermediate', 'Graduate', 'Post Graduate']

  // Reactive Form
  empForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private employeeService: EmployeeService,
    private _dialogRef: MatDialogRef<AddEditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService
  ) { }


  public ngOnInit() {
    this.empForm = this._fb.group({
      'userName': new FormGroup({
        'fname': new FormControl('', [Validators.required]),
        'lname': new FormControl('', [Validators.required]),
      }),
      'userDetails': new FormGroup({
        'email': new FormControl('', [Validators.required]),
        'dob': new FormControl('', [Validators.required]),
      }),
      'gender': new FormControl('', [Validators.required]),
      'education': new FormControl('', [Validators.required]),
      'company': new FormControl('', [Validators.required]),
      'experience': new FormControl('', [Validators.required]),
      'package': new FormControl('', [Validators.required]),
    })

    this.empForm.patchValue(this.data);
  }

  public onSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        // Editing Exsisting Employee
        this.employeeService.updateEmployee(this.data.id, this.data).subscribe({
          next: (res) => {
            this.snackbar.openSnackBar("Employee Updated Successfully", '');
            this._dialogRef.close(true);
          },
          error: (err) => { }
        });
      } else {
        // Adding New Employee
        this.employeeService.addEmployee(this.empForm.value).subscribe({
          next: (res) => {
            this.snackbar.openSnackBar("Employee Added Successfully", '');
            this._dialogRef.close(true);
          },
          error: (error) => { console.log(error) }
        })
      }
    }
  }
}



