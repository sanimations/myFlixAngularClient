import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.scss'
})
export class UserProfilePageComponent implements OnInit{

  user: any = {Username: '', Password: '', Email: '', Birthday: '' };
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
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

  }

}
