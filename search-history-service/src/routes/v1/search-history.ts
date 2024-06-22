import express from "express";

import { getSearchHistory } from "../../controllers/search-history";

const router = express.Router();

//Get price of a coin and send email back to investor
router.route("/").get(getSearchHistory);

export default router;
