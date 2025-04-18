import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    default: '',
  },
  avatar: {
    type: String,
    default: '',
  },
  souvenirScore: {
    type: Number,
    default: 0,
  },
  ancragePasse: {
    type: Number,
    default: 0,
  },
  lienPNJ: {
    type: Number,
    default: 0,
  },
  score: {
    type: Number,
    default: 0,
  },
  lastLoginDate: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;