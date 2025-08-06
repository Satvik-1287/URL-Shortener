import { Router } from "express";
import { generateShortUrl } from "../controllers/Url.js";

const urlRouter = Router();

urlRouter.post("/shorten", generateShortUrl);

// urlRouter.get("/:shortId", redirectToUrl);

export default urlRouter;