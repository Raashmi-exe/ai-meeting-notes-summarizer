import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import summarizeRoute from "./routes/summarize.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/summarize", summarizeRoute);
app.get("/", (req, res) => {
    res.json({
        message: "Meeting Notes AI Backend Running 🚀"
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});