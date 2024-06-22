import express from "express";

import { getPrice } from "../../controllers/v1/coins";

const router = express.Router();

//Get price of a coin and send email back to investor
router.route("/price").get(getPrice);

export default router;
