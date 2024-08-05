import { Schema, model } from 'mongoose';

const TokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      unique: true
    },
    accessToken: {
      type: String,
      required: false
    },
    refreshToken: {
      type: String,
      required: false
    },
    accessExpiryTime: {
      type: String,
      required: false
    },
    refreshExpiryTime: {
      type: String,
      required: false
    }
  },
  { versionKey: false }
);

const TokenModel = model('Token', TokenSchema);

export default TokenModel;
