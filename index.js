import express from "express";
import handler from "./chat.js";
import { loadLocalFiles, loadRepository } from "./loader.js";

const app = express();
app.use(express.json());
const port = 3000;

app.get("/load-files", async (req, res) => {
  await loadLocalFiles();
  res.send("Database seeded!");
});

app.post("/load-repository", async (req, res) => {
  await loadRepository(req.body.url, req.body.branch);
  res.send("Repository added!");
});

app.post("/chat", async (req, res) => {
  console.log(req.body);
  const response = await handler(req.body.question);
  res.json(response);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
