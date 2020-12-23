import express, { NextFunction, Request, Response } from "express";
import { Github } from "../Github";

const router = express.Router();

router.get(
  "/user/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const github = new Github();
    try {
      const response = await github.getUser(req.params.id);
      res.send(response.data);
    } catch (error) {
      return next(error);
    }
  }
);

export { router as getUserRouter };
