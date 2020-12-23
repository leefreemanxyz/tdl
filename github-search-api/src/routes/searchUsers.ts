import express, { NextFunction, Request, Response } from "express";
import { Github } from "../Github";

const router = express.Router();

const paramsToQueryString = (params: any, rest: any) => {
  return Object.keys({ ...params, ...rest })
    .map((key) => key + "=" + params[key])
    .join("&");
};

router.get(
  "/search/users",
  async (req: Request, res: Response, next: NextFunction) => {
    const qs = paramsToQueryString(req.query, { type: "user" });
    const github = new Github();
    try {
      const response = await github.searchUsers(qs);
      res.send(response.data);
    } catch (error) {
      return next(error);
    }
  }
);

export { router as searchUsersRouter };
