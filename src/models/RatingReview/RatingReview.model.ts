import { Schema, model } from 'mongoose';

const RatingAndReviewSchema = new Schema(
  {
    reviewerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Movie', // Reference to the Movie model
      required: true
    },
    reviewType: {
      type: Number,
      required: true,
      enum: [1, 2, 3]
    },
    ratings: {
      type: Number,
      required: true,
      min: 1,
      max: 10
    },
    votes: {
      type: Number,
      default: 0
    },
    like: {
      type: Number,
      default: 0
    },
    dislike: {
      type: Number,
      default: 0
    },
    lovedAspect: {
      type: [String] // An array of strings
    },
    dislikeAspect: {
      type: [String] // An array of strings
    },
    review: {
      type: String, // Optional review text
      default: ''
    },
    languages: {
      type: [String] // An array of languages
    },
    response: {
      type: String,
      default: ''
    },
    moderationStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    reportCount: {
      type: Number,
      default: 0
    },
    media: {
      type: [String] // URLs of the media files
    },
    userLocation: {
      type: String
    },
    userRole: {
      type: String // e.g., 'verified buyer', 'frequent reviewer'
    }
  },
  {
    timestamps: true
  }
);

const RatingModel = model('RatingAndReview', RatingAndReviewSchema);

export default RatingModel;
