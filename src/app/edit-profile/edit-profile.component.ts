import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit {

  @Input() userChanges = { username: '', password: '', email: '', birthday: ''}

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar
    ) { }


    ngOnInit(): void {

    }

    userEdits(): void {
      let oldUsername = JSON.stringify(localStorage.getItem('username'));
      if (!oldUsername) {
        console.error('Username not found in localStorage');
        return; // Exit early if username is not found
      }
      this.fetchApiData.editUser(oldUsername, this.userChanges).subscribe({
        next: (response) => {
          console.log('User edited successfully:', response);
          // Handle success scenario (e.g., display success message)
        },
        error: (error) => {
          console.error('Error editing user:', error);
          // Handle error scenario (e.g., display error message)
        }
      });
    }
}
