import { MovieModel, RatingModel, UserModel } from '@models/index'; // Adjust path as necessary
import { HttpException } from '@exceptions/HttpException';
import { RatingReviewInterface } from '@interfaces/index';

class RatingService {
  private userModel = UserModel;
  private movieModel = MovieModel;
  public async createRatingReview(ratingReviewData: RatingReviewInterface) {
    try {
      const { reviewerId, productId, ratings, ...otherData } = ratingReviewData;

      const user = await this.userModel.findById(reviewerId);
      if (!user) {
        throw new HttpException(404, 'Reviewer not found');
      }

      const movie = await this.movieModel.findById(productId);
      if (!movie) {
        throw new HttpException(404, 'Product (Movie) not found');
      }

      if (ratings < 1 || ratings > 10) {
        throw new HttpException(400, 'Ratings should be between 1 and 10');
      }

      const ratingReview = await RatingModel.create({
        reviewerId,
        productId,
        ratings,
        ...otherData
      });

      // Populate reviewerId and productId fields
      return await RatingModel.findById(ratingReview._id)
        .populate('reviewerId', 'firstName lastName email')
        .populate('productId', 'title description releaseDate');
    } catch (err) {
      if (err.message.includes('E11000')) {
        throw new HttpException(
          400,
          'Rating and review already exists due to unique constraint violation!'
        );
      }
      throw new HttpException(
        err.status || 500,
        err?.message || 'Something went wrong'
      );
    }
  }

  public async getAllRatingsReviews(movieId?: string, reviewerId?: string) {
    try {
      const query: any = {};
      if (movieId) query.productId = movieId;
      if (reviewerId) query.reviewerId = reviewerId;

      return await RatingModel.find(query);
    } catch (err) {
      throw new HttpException(
        err.status || 500,
        err?.message || 'Failed to fetch ratings and reviews'
      );
    }
  }

  public async getRatingReviewById(id: string) {
    try {
      const ratingReview = await RatingModel.findById(id);
      if (!ratingReview) {
        throw new HttpException(404, 'Rating and review not found');
      }
      return ratingReview;
    } catch (err) {
      throw new HttpException(
        err.status || 500,
        err?.message || 'Failed to fetch rating and review'
      );
    }
  }

  public async updateRatingReview(id: string, ratingReviewData: any) {
    try {
      const ratingReview = await RatingModel.findByIdAndUpdate(
        id,
        ratingReviewData,
        { new: true }
      );
      if (!ratingReview) {
        throw new HttpException(404, 'Rating and review not found');
      }
      return ratingReview;
    } catch (err) {
      if (err.message.includes('E11000')) {
        throw new HttpException(
          400,
          'Rating and review update failed due to unique constraint violation!'
        );
      }
      throw new HttpException(
        err.status || 500,
        err?.message || 'Failed to update rating and review'
      );
    }
  }

  public async deleteRatingReview(id: string) {
    try {
      const ratingReview = await RatingModel.findByIdAndDelete(id);
      if (!ratingReview) {
        throw new HttpException(404, 'Rating and review not found');
      }
      return ratingReview;
    } catch (err) {
      throw new HttpException(
        err.status || 500,
        err?.message || 'Failed to delete rating and review'
      );
    }
  }
}

export default RatingService;
