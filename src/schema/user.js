import joi from "joi";

export const loginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

export const registerSchema = joi.object({
  name: joi.string(),
  email: joi.string().required(),
  password: joi.string().required(),
  userType: joi.string().required().valid("admin", "organizer", "attendee"),
});
