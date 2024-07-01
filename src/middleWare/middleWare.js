import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";
import { model } from "../module/index.js";
import { errorGenerator } from "../handler/errorGenerator.js";

export const authentication = async (req, res, next) => {
  const token = req?.headers?.["x-token"];
  console.log("🚀 ~ authentication ~ token:", token)
  if (!token) return errorGenerator(res, 500, "Session expire or invalid");
  let { email } = await jwt.verify(token, SECRET_KEY);
  console.log("🚀 ~ authentication ~ email:", email)
  const user = await model.User.findOne({ email });
  if (!user) return errorGenerator(res, 500, "Session expire or invalid");
  req.me = user;
  next(); 
};

export const isAdmin = (req, res, next) => {
  if (req.me.userType !== "admin")
    return errorGenerator(res, 500, "Session expire or invalid");
  else next();
};
