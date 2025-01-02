import mongoose, { Schema } from "mongoose";

const incomeSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    spent: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const incomeModel =
  mongoose.models.income || mongoose.model("income", incomeSchema);
export default incomeModel;
