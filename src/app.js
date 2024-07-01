import express from "express";
import router from "./router/index.js";
import cors from "cors";
const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/v1", router);
app.use("/save", (req, res) => {
  console.log(req.headers);
});

export default app;
