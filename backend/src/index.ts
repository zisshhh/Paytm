import express from "express"
import cors from "cors"
import { rootRouter } from "./routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.get("/", (req, res) => {
  res.redirect("/api/v1/user/signup");
});


app.listen(3000);