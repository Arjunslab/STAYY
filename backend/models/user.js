import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  hotelName: String,
  location: String,
  image: String,
  checkIn: String,
  checkOut: String,
  price: String,
  status: { type: String, enum: ["Upcoming", "Completed", "Cancelled"], default: "Upcoming" },
  rating: { type: Number, default: 0 }
});

const savedPlaceSchema = new mongoose.Schema({
  name: String,
  location: String,
  image: String,
  rating: Number,
  price: String
});

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    avatar: String,
    password: String,
    googleId: String,
    phone: String,

    emailVerified: {
  type: Boolean,
  default: false,
},

emailOtp: String,

emailOtpExpires: Date,

    balance: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    tier: { type: String, default: "Silver" },

    bookings: [bookingSchema],
    savedPlaces: [savedPlaceSchema],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
