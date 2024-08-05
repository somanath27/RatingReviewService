import { Router } from 'express';
import { RatingController } from '@controllers/index';
import { Routes } from '@interfaces/index';

class RatingRoute implements Routes {
  public path = '/ratings-reviews';
  public router = Router();
  private ratingController = new RatingController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, this.ratingController.createRatingReview);

    this.router.get(this.path, this.ratingController.getAllRatingsReviews);

    this.router.get(
      `${this.path}/:id`,
      this.ratingController.getRatingReviewById
    );

    this.router.put(
      `${this.path}/:id`,
      this.ratingController.updateRatingReview
    );

    this.router.delete(
      `${this.path}/:id`,
      this.ratingController.deleteRatingReview
    );
  }
}

export default RatingRoute;
