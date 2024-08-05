import { Request, Response } from 'express';
import { RatingService } from '@services/index';
import * as ApiResponse from '@utils/ApiResponse';
import catchAsync from '@utils/async';

class RatingController {
  private ratingService = new RatingService();

  public createRatingReview = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const createRatingReview = await this.ratingService.createRatingReview(
        req.body
      );
      ApiResponse.successResponseWithData(
        res,
        'Rating and review created successfully',
        createRatingReview
      );
    }
  );

  public getAllRatingsReviews = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const { movieId, reviewerId } = req.query;
      const ratingsReviews = await this.ratingService.getAllRatingsReviews(
        movieId as string,
        reviewerId as string
      );
      ApiResponse.successResponseWithData(
        res,
        'Ratings and reviews fetched successfully',
        ratingsReviews
      );
    }
  );

  public getRatingReviewById = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const ratingReview = await this.ratingService.getRatingReviewById(
        req.params.id
      );
      ApiResponse.successResponseWithData(
        res,
        'Rating and review fetched successfully',
        ratingReview
      );
    }
  );

  public updateRatingReview = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const ratingReview = await this.ratingService.updateRatingReview(
        req.params.id,
        req.body
      );
      ApiResponse.successResponseWithData(
        res,
        'Rating and review updated successfully',
        ratingReview
      );
    }
  );

  public deleteRatingReview = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      await this.ratingService.deleteRatingReview(req.params.id);
      ApiResponse.successResponse(
        res,
        'Rating and review deleted successfully'
      );
    }
  );
}

export default RatingController;
