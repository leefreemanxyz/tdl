import express, { Request, Response } from "express";
import { Github } from "../Github";

const router = express.Router();

const paramsToQueryString = (params: any, rest: any) => {
  return Object.keys({ ...params, ...rest })
    .map((key) => key + "=" + params[key])
    .join("&");
};

router.get("/search/users", async (req: Request, res: Response) => {
  const qs = paramsToQueryString(req.query, { type: "user" });
  const github = new Github();
  const data = await github.searchUsers(qs);
  res.send(data);
});

export { router as searchUsersRouter };
