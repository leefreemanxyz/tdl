import { app } from "./app";

const PORT = process.env.PORT || 3001;

const start = () => {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN not defined");
  }
  app.listen(PORT, () => {
    console.log(`listening on port:${PORT}`);
  });
};
start();
