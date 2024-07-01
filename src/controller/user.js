import jwt from "jsonwebtoken";
import { asyncHandler } from "../handler/asyncHandler.js";
import {
  errorGenerator,
  schemaErrorHandler,
} from "../handler/errorGenerator.js";
import { SECRET_KEY } from "../config.js";
import { responseGenerator } from "../handler/responseGenerator.js";
import { model } from "../module/index.js";
import { loginSchema, registerSchema } from "../schema/user.js";

const tokenGenerator = ({ email, _id, userType }) => {
  return jwt.sign({ email, id: _id, userType }, SECRET_KEY);
};

export const signIn = asyncHandler(async (req, res) => {
  const input = req.body;

  let error = schemaErrorHandler(loginSchema, input);
  if (error) return errorGenerator(res, 400, { message: error });

  const user = await model.User.findOne({ email: input.email });
  if (!user) return errorGenerator(res, 400, { message: "User not found" });

  responseGenerator(
    res,
    { data: user, token: tokenGenerator(user) },
    { message: "User login successfully" }
  );
});

export const register = asyncHandler(async (req, res) => {
  const input = req.body;

  let error = schemaErrorHandler(registerSchema, input);
  if (error) return errorGenerator(res, 400, { message: error });

  const matchUser = await model.User.findOne({ email: input.email });
  if (matchUser) {
    return errorGenerator(res, 400, { message: "This email is already used" });
  }
  const user = await model.User.create(input);

  responseGenerator(
    res,
    { data: user, token: tokenGenerator(user) },
    { message: "User register successfully" }
  );
});

export const getAllOrganizer = asyncHandler(async (req, res) => {
  const data = await model.User.find({ userType: "organizer" });

  responseGenerator(res, data, { message: "organizer fetch successfully" });
});
