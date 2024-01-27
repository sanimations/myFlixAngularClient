import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'

import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit{

  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    const u = localStorage.getItem('username');
    if (u) {
      this.fetchApiData.getAllMovies().subscribe((res: any) => {
        this.movies = res;
        // Fetch user's favorite movies
        this.fetchApiData.getUserFavoriteMovies(u).subscribe((favorites: any[]) => {
          // Iterate through each movie and check if it's in the user's favorites
          this.movies.forEach((movie: any) => {
            movie.isFavorite = favorites.some((fav: any) => fav._id === movie._id);
          });
        });
      });
    } else {
      console.error('Username not found in localStorage');
    }
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
}