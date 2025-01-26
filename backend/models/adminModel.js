import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    speciality: { type: String, required: true, trim: true },
    degree: { type: String, required: true, trim: true },
    experience: { type: String, required: true, trim: true },
    about: { type: String, required: true, trim: true },
    available: { type: Boolean, default: true },
    fees: { type: Number, required: true, min: 0 },
    slots_booked: {
      type: Map,
      of: String, // Assuming keys map to string values
      default: {},
    },
    address: {
      line1: { type: String, required: true, trim: true },
      line2: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      postalCode: { type: String, required: true, trim: true },
    },
    date: { type: Date, default: Date.now },
  },
  { minimize: false }
);

const adminModel = mongoose.models.admin || mongoose.model("admin", adminSchema);
export default adminModel;
