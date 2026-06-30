import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.text("@repo/api"));

export default app;
