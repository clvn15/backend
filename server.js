import express from "express";
import cors from "cors";
import bphRoutes from "./routes/bphRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/bph", bphRoutes);

app.listen(5000, () => console.log("SERVER RUNNING"));
