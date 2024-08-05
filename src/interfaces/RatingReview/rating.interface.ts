export interface RatingReviewInterface {
  reviewerId: string;
  productId: string;
  reviewType?: number;
  ratings?: number;
  votes?: number;
  like?: number;
  dislike?: number;
  lovedAspect?: string[];
  dislikeAspect?: string[];
  review?: string;
  languages?: string[];
  response?: string;
  moderationStatus?: string;
  reportCount?: number;
  media?: string[];
  userLocation?: string;
  userRole?: string;
}
