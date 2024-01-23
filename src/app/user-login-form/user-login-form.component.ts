import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {
  
  @Input() loginData = { Username: '', Password: ''}

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar) { }

ngOnInit(): void {
}

loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe({
      next: (result: any) => {
        console.log("result" + result)
        console.log("result and user" + result.user)
        console.log("result and user and username" + result.user.Username)
        console.log("result and username" + result.Username)
        localStorage.setItem('user',  JSON.stringify(result.Username));
        localStorage.setItem('token', result.token);
        
  // Logic for a successful user registration goes here! (To be implemented)
     this.dialogRef.close(); // This will close the modal on success!
     console.log(result)
     this.snackBar.open('Login Successful', 'OK', {
        duration: 2000
     });
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
