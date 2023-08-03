import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
	res.status(404).json({ message: "Not Found" });
});

export default router;
