import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {
  
  @Input() loginData = { username: '', password: ''}

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
    ) { }

ngOnInit(): void {
}

loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe({
      next: (result: any) => {
        localStorage.setItem('email',  result.user.Email);
        localStorage.setItem('birthday',  result.user.Birthday);
        localStorage.setItem('username',  result.user.Username);
        localStorage.setItem('password',  result.user.Password);
        localStorage.setItem('username',  result.user.Username);
        localStorage.setItem('token', result.token);
        
  // Logic for a successful user registration goes here! (To be implemented)
     this.dialogRef.close(); // This will close the modal on success!
     console.log(result)
     this.snackBar.open('Login Successful', 'OK', {
        duration: 2000
     });

     this.router.navigate(['movies']);
    }, 
    error: (error: any) => {
      console.log(error);
      this.snackBar.open(error, 'OK', {
        duration: 2000
      });
    }
    });
  }

  }
