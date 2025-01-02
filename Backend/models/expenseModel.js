import mongoose, { Schema } from "mongoose";

const expenseSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
    incomeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "income",
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    category: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const expenseModel =
  mongoose.models.expense || mongoose.model("expense", expenseSchema);
export default expenseModel;
