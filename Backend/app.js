import http from 'http';
import { ALLOWED_ORIGINS } from './utils/config.js';
import { userRoutes } from './routes/userRoutes.js';
import { menuRoutes } from './routes/menuRoutes.js';
import { orderRoutes } from './routes/orderRoutes.js';

const app = async (req, res) => {
  const origin = req.headers.origin;

  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  try {
    if (await userRoutes(req, res, pathname, method) !== "not_found") return;
    if (await menuRoutes(req, res, pathname, method) !== "not_found") return;
    if (await orderRoutes(req, res, pathname, method) !== "not_found") return;

    res.writeHead(404);
    res.end(JSON.stringify({ error: `Route ${pathname} not found` }));
  } catch (error) {
    console.error(error);
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
};

export default app;