import { Schema, model } from 'mongoose';

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    releaseDate: {
      type: Date,
      required: true
    },
    genre: {
      type: [String]
    },
    director: {
      type: String
    },
    actors: {
      type: [String]
    }
  },
  {
    timestamps: true
  }
);

const MovieModel = model('Movie', movieSchema);

export default MovieModel;
