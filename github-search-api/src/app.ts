import express from "express";
import cors from "cors";
import { NotFoundError, errorHandler } from "@lfxyz/common";
import { searchUsersRouter } from "./routes/searchUsers";
import "express-async-errors";
import { json } from "body-parser";
import { getUserRouter } from "./routes/getUser";

const app = express();
app.use(cors());
app.use(json());

app.use(getUserRouter);
app.use(searchUsersRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
