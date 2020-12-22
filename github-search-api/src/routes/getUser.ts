import express, { Request, Response } from "express";
import { Github } from "../Github";

const router = express.Router();

router.get("/user/:id", async (req: Request, res: Response) => {
  const github = new Github();
  console.log("getting users");
  const data = await github.getUser(req.params.id);
  console.log(data);
  res.send(data);
});

export { router as getUserRouter };
