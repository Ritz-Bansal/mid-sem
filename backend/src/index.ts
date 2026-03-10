import express from "express";
import ENV from "./utils/config";
import apiRoutes from "./routes";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "*",
  credentials: true,
}));
app.use(express.json());


app.use("/api/v1", apiRoutes);

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});