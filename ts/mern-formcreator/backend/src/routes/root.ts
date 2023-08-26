import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
	res.send(
		`
		<!doctype html>
		<html lang="en">
		<head>
			<style>
				:root {
					color-scheme: light dark;
				}
			</style>
		</head>
		<body>
			<h1>API is running.</h1>
			<p>
				Go to <a href="/api/auth">/api/auth</a> to see the auth routes. <br />
				Go to <a href="/api/form">/api/form</a> to see the form routes.
			</p>
		</body>
		</html>
			`,
	);
});

export default router;
