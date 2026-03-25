import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, "dist");

app.use(express.static(distPath));

app.use((req, res) =>
{
    res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, () =>
{
    console.log(`Frontend server running on port ${port}`);
});
