import { getOrders, createOrder, updateOrder } from '../controllers/orderController.js';
import { getBody } from './routeUtils.js';

export const orderRoutes = async (req, res, pathname, method) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (pathname === "/orders") {
    if (method === "GET") { await getOrders(req, res, url); return; }
    if (method === "POST") { const body = await getBody(req); await createOrder(req, res, body); return; }
  }
  if (pathname.startsWith("/orders/") && method === "PATCH") {
    const body = await getBody(req);
    await updateOrder(req, res, pathname, body);
    return;
  }
  return "not_found";
};