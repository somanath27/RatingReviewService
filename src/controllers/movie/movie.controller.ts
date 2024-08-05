import { Request, Response, NextFunction } from 'express';
import { MovieService } from '@services/index';
import { HttpException } from '@exceptions/HttpException';
import * as ApiResponse from '@utils/ApiResponse';

class MovieController {
  private movieService = new MovieService();

  public createMovie = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const movie = await this.movieService.createMovie(req.body);
      ApiResponse.successResponseWithData(
        res,
        'Movie created successfully',
        movie
      );
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  };

  public getMovies = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const movies = await this.movieService.getMovies();
      ApiResponse.successResponseWithData(
        res,
        'Movies fetched successfully',
        movies
      );
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  };

  public getMovieById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const movie = await this.movieService.getMovieById(req.params.id);
      ApiResponse.successResponseWithData(
        res,
        'Movie fetched successfully',
        movie
      );
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  };

  public updateMovie = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const movie = await this.movieService.updateMovie(
        req.params.id,
        req.body
      );
      ApiResponse.successResponseWithData(
        res,
        'Movie updated successfully',
        movie
      );
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  };

  public deleteMovie = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.movieService.deleteMovie(req.params.id);
      ApiResponse.successResponse(res, 'Movie deleted successfully');
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  };
}

export default MovieController;
