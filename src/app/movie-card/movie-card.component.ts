import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { DescriptionCardComponent } from '../description-card/description-card.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllMoviesAndFavorites();
  }


  getAllMoviesAndFavorites(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      console.log(this.movies);
      const username = localStorage.getItem('username');
      if (username) {
        this.getUserFavoriteMovies(username);
      }
    });
  }
  
  public getUserFavoriteMovies(username: string): void {
    this.fetchApiData.getUsers().pipe(
      map((users: any[]) => {
        // Find the user object with the matching username
        const user = users.find((user: any) => user.Username === username);
        if (user && user.FavoriteMovies) {
          this.favorites = user.FavoriteMovies;
          // Mark favorite movies as isFavorite
          this.movies.forEach((movie: any) => {
            movie.isFavorite = this.favorites.includes(movie._id);
          });
        } else {
          this.favorites = [];
        }
      })
    ).subscribe();
  }

  getUserProfile(): void {
    this.router.navigate(['profile']);
  }

  toggleFavorite(movie: any) {
    const u = localStorage.getItem('username');
    if (u) {
      if (movie.isFavorite) {
        this.fetchApiData.deleteFavoriteMovie(u, movie._id).subscribe(() => {
          movie.isFavorite = false;
        });
      } else {
        this.fetchApiData.addFavoriteMovie(u, movie._id).subscribe(() => {
          movie.isFavorite = true;
        });
      }
    } else {
      console.error('Username not found in localStorage');
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

  logout(): void{
    localStorage.clear(),
    this.router.navigate(['welcome']);
  }
}