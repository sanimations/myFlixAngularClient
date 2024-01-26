import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {

  movies: any[] = [];
  
  constructor(public fetchApiData: FetchApiDataService) { }

ngOnInit(): void {
  this.getMovies();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  toggleFavorite(movie: any) {
    const u = localStorage.getItem('user');
    if (u) {
      if (movie.isFavorite) {
        this.fetchApiData.deleteFavoriteMovie(u, movie.id).subscribe(() => {
          movie.isFavorite = false;
        });
      } else {
        this.fetchApiData.addFavoriteMovie(u, movie.id).subscribe(() => {
          movie.isFavorite = true;
        });
      }
    } else {
      console.error('Username not found in localStorage');
    }
  }
}