// import mongoose from "mongoose";

// const adminSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     email: { type: String, required: true, unique: true, trim: true },
//     password: { type: String, required: true },
//     image: { type: String, required: true },
//     speciality: { type: String, required: true, trim: true },
//     degree: { type: String, required: true, trim: true },
//     experience: { type: String, required: true, trim: true },
//     about: { type: String, required: true, trim: true },
//     available: { type: Boolean, default: true },
//     fees: { type: Number, required: true, min: 0 },
//     slots_booked: {
//       type: Map,
//       of: String, 
//       default: {},
//     },
//     address: {
//       line1: { type: String, required: true, trim: true },
//       line2: { type: String, required: true, trim: true },
//       city: { type: String, required: true, trim: true },
//       state: { type: String, required: true, trim: true },
//       postalCode: { type: String, required: true, trim: true },
//     },
//     date: { type: Date, default: Date.now },
//   },
//   { minimize: false }
// );

// const adminModel = mongoose.models.admin || mongoose.model("admin", adminSchema);
// export default adminModel;
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    image: { type: String, trim: true, default: "" }, // Optional profile picture
    speciality: { type: String, required: true, trim: true },
    degree: { type: String, required: true, trim: true },
    experience: { type: Number, required: true, min: 0 }, // Number of years
    about: { type: String, required: true, trim: true },
    available: { type: Boolean, default: true },
    fees: { type: Number, required: true, min: 0 },
    slots_booked: [
      {
        date: { type: Date, required: true },
        time: { type: String, required: true }, // Or use a Date type if possible
      }
    ],
    address: {
      line1: { type: String, required: true, trim: true },
      line2: { type: String, trim: true, default: "" },
      city: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      postalCode: { type: String, required: true, trim: true },
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt
);

// Hash password before saving
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare passwords
adminSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
export default Admin;
