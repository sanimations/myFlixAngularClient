import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (result: any) => {
        let loginData = { username: this.userData.Username, password: this.userData.Password }
        this.fetchApiData.userLogin(loginData).subscribe({
          next: (loginResult: any) => {
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('email', loginResult.user.Email);
            localStorage.setItem('birthday', loginResult.user.Birthday);
            localStorage.setItem('username', loginResult.user.Username);
            localStorage.setItem('password', loginResult.user.Password);
            localStorage.setItem('token', loginResult.token);
            this.dialogRef.close();
            this.router.navigate(['movies']);
          }
        });
        console.log('signup/login worked');

        // Logic for a successful user registration goes here! (To be implemented)
        console.log(result)
        this.snackBar.open('Welcome to Queer Cinema!', 'OK', {
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