import { Router } from 'express';
import { MovieController } from '@controllers/index';
import { Routes } from '@interfaces/index';

class MovieRoute implements Routes {
  public path = '/movies';
  public router = Router();
  private movieController = new MovieController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, this.movieController.createMovie);
    this.router.get(this.path, this.movieController.getMovies);
    this.router.get(`${this.path}/:id`, this.movieController.getMovieById);
    this.router.put(`${this.path}/:id`, this.movieController.updateMovie);
    this.router.delete(`${this.path}/:id`, this.movieController.deleteMovie);
  }
}

export default MovieRoute;
