import { MovieModel } from '@models/index';
import { HttpException } from '@exceptions/HttpException';

class MovieService {
  public async createMovie(movieData: any) {
    try {
      return await MovieModel.create(movieData);
    } catch (err) {
      if (err.message.includes('E11000')) {
        throw new HttpException(
          400,
          'Movie already exists due to unique constraint violation!'
        );
      }
      throw new HttpException(
        err.status || 500,
        err?.message || 'Something went wrong'
      );
    }
  }

  public async getMovies() {
    try {
      return await MovieModel.find();
    } catch (err) {
      throw new HttpException(
        err.status || 500,
        err?.message || 'Failed to fetch movies'
      );
    }
  }

  public async getMovieById(id: string) {
    try {
      const movie = await MovieModel.findById(id);
      if (!movie) {
        throw new HttpException(404, 'Movie not found');
      }
      return movie;
    } catch (err) {
      throw new HttpException(
        err.status || 500,
        err?.message || 'Failed to fetch movie'
      );
    }
  }

  public async updateMovie(id: string, movieData: any) {
    try {
      const movie = await MovieModel.findByIdAndUpdate(id, movieData, {
        new: true
      });
      if (!movie) {
        throw new HttpException(404, 'Movie not found');
      }
      return movie;
    } catch (err) {
      if (err.message.includes('E11000')) {
        throw new HttpException(
          400,
          'Movie update failed due to unique constraint violation!'
        );
      }
      throw new HttpException(
        err.status || 500,
        err?.message || 'Failed to update movie'
      );
    }
  }

  public async deleteMovie(id: string) {
    try {
      const movie = await MovieModel.findByIdAndDelete(id);
      if (!movie) {
        throw new HttpException(404, 'Movie not found');
      }
      return movie;
    } catch (err) {
      throw new HttpException(
        err.status || 500,
        err?.message || 'Failed to delete movie'
      );
    }
  }
}

export default MovieService;
