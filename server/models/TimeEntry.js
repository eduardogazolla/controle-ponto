// server/models/TimeEntry.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeEntrySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true }, // Formatado como "YYYY-MM-DD" para facilitar consultas por dia
    morningEntry: { type: String },
    morningExit: { type: String },
    afternoonEntry: { type: String },
    afternoonExit: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TimeEntry", timeEntrySchema);
