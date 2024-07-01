import jwt from "jsonwebtoken";
import { asyncHandler } from "../handler/asyncHandler.js";
import { responseGenerator } from "../handler/responseGenerator.js";
import { model } from "../module/index.js";
import { eventSchema } from "../schema/event.js";
import {
  errorGenerator,
  schemaErrorHandler,
} from "../handler/errorGenerator.js";

export const create = asyncHandler(async (req, res) => {
  const input = req.body;

  let error = schemaErrorHandler(eventSchema, input);
  if (error) return errorGenerator(res, 400, { message: error });

  const event = await model.Event.create(input);
  responseGenerator(res, event, { message: "Event create successfully" });
});

export const getAll = asyncHandler(async (req, res) => {
  let filter = {};

  if (req?.me?.userType === "organizer") {
    filter = { organizer: req?.me?._id };
  }
  const events = await model.Event.find(filter).populate({
    path: "organizer",
    select: "name _id email",
  });
  responseGenerator(res, events, {
    message: "All events fetched successfully",
  });
});

export const deleteEvent = asyncHandler(async (req, res) => {
  const input = req.params;

  const filter = { _id: input?.id };
  if (req?.me?.userType !== "admin") {
    filter.organizer = req?.me?._id;
  }

  let data = await model.Event.findOneAndDelete(filter);
  if (data) {
    return responseGenerator(res, "events", {
      message: "Events delete successfully",
    });
  } else
    return errorGenerator(res, 400, { message: "Matching Event not found" });
});

export const updateEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const input = req.body;

  const filter = { _id: id };
  if (req?.me?.userType !== "admin") {
    filter.organizer = req?.me?._id;
  }

  let data = await model.Event.findOneAndUpdate(filter, input, { new: true });
  if (data) {
    return responseGenerator(res, data, {
      message: "Events delete successfully",
    });
  } else
    return errorGenerator(res, 400, { message: "Matching Event not found" });
});
