import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit {

  @Input() userChanges = { Username: '', Password: '', Email: ''}

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar,
    private router: Router
    ) { }


    ngOnInit(): void {
    }

    userEdits(): void {
      let oldUsername = localStorage.getItem('username');
      console.log("old in .ts = "+ oldUsername)
      if (!oldUsername) {
        console.error('Username not found in localStorage');
        return; // Exit early if username is not found
      }
      this.fetchApiData.editUser(oldUsername, this.userChanges).subscribe({
        next: (response) => {
          console.log('User edited successfully:', response);
          console.log('email: ' + this.userChanges.Email)
          localStorage.setItem('email', this.userChanges.Email);
          localStorage.setItem('username', this.userChanges.Username);
          localStorage.setItem('password', this.userChanges.Password);
          this.snackBar.open('User edited successfully', 'Close', {
            duration: 3000, 
          });
          
          this.dialogRef.close();
          this.router.navigate(['movies']);

        },
        error: (error) => {
          console.error('Error editing user:', error);
          // Handle error scenario (e.g., display error message)
        }
      });
    }
}
