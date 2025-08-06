import express from "express";
import "dotenv/config";
import connectToDB from "./config/db.js";
import apiRouter from "./routes/apiRoutes.js";
import urlRouter from "./routes/url.js";
import { redirectToUrl } from "./controllers/Url.js";
import path from "path";
import { fileURLToPath } from "url";

// Required for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const port = process.env.PORT;
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));
    
const names = [
    {id:1, name: "Satvik"},
    {id:2, name: "Ronak"},
    {id:3, name: "Aarju"},
];

// Connecting to the DB
connectToDB();

app.use(express.json());

// Routes
// app.use("/data", apiRouter);

app.use("/api/url", urlRouter);
app.get("/:shortId", redirectToUrl);

// To start the server
app.listen(port, () => console.log("Server started at port ", + port));