import joi from "joi";

export const eventSchema = joi.object({
  name: joi.string().required(),
  date: joi.date().required(),
  attendee: joi.string(),
  organizer: joi.string().required(),
});
