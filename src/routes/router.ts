import AuthRoute from './auth/auth.route';
import MovieRoute from './movie/movie.route';
import RatingRoute from './ratingreview/ratingreview.route';

const router = [new AuthRoute(), new MovieRoute(), new RatingRoute()];

export default router;
