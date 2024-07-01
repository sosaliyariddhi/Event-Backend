import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const eventSchema = mongoose.Schema(
  {
    name: String,
    date: Date,
    attendee: String,
    organizer: {
      type: ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model("event", eventSchema);
