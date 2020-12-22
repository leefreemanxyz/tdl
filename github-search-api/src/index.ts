import { app } from "./app";

const start = () => {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN not defined");
  }
  app.listen(3001, () => {
    console.log("listening on localhost:3001");
  });
};
start();
