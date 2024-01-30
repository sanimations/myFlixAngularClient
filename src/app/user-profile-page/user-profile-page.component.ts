import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { DescriptionCardComponent } from '../description-card/description-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.scss'
})
export class UserProfilePageComponent implements OnInit {

  user: any = { Username: '', Password: '', Email: '', Birthday: '' };
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = {
      Username: localStorage.getItem('username'),
      Password: localStorage.getItem('password'),
      Email: localStorage.getItem('email'),
      Birthday: localStorage.getItem('birthday')
    };
  }


  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: '280px'
    });
  }

  deleteProfile(): void {
    let username = localStorage.getItem('username');
    if (username) {
      this.fetchApiData.deleteUser(username).subscribe({
        next: (response) => {
          localStorage.clear();
          this.router.navigate(['welcome']);
          console.log('User deleted successfully:', response);
          this.snackBar.open('Bye now!', 'Close', {
            duration: 3000, 
          });
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          // Optionally, handle the error scenario (e.g., display an error message)
        }
      });
    } else {
      console.log('Username not found!');
    }
  }

  openGenreDialog(Genre: any): void {
    this.dialog.open(GenreCardComponent, {
      data: {
       name: Genre.Name,
       description: Genre.Description,
       
      }
    })
    };
  

    openDirectorDialog(Director: any): void {
      this.dialog.open(DirectorCardComponent, {
        data: {
          name: Director.Name,
          bio: Director.Description,
          birth: Director.Birth
          
         }
      })
    }

    openDescriptionDialog(Description: any, Genre: any, Director: any): void {
      this.dialog.open(DescriptionCardComponent, {
        data: {
          description: Description,
          director: Director.Name,
          genre: Genre.Name
        }
      });
    }

  logout(): void {
    localStorage.clear(),
      this.router.navigate(['welcome']);
  }
  back(): void {
    this.router.navigate(['movies']);
  }

}
