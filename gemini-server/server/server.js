import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// const cors = require('cors');
import { appConfig } from "./config/appConfig.js";
import { aiController } from "./controllers/aiController.js";

const app = express();
app.use(cors());
// app.use(
//   cors({
//     origin: appConfig.corsConfig.origin,
//     methods: appConfig.corsConfig.methods,
//     allowedHeaders: ["Content-Type", "application/json"],
//   })
// );
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT;

app.post("/chat-with-gemini", aiController);

app.listen(PORT, () => {
  console.log("Gemini AI Server is listening on port number", PORT);
});
