import express from "express"
import cors from "cors"
import { rootRouter } from "./routes";
import dotenv from 'dotenv'
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT

app.use("/api/v1", rootRouter);

app.get("/", (req, res) => {
  res.redirect("/api/v1/user/signup");
});


app.listen(PORT);