import { Order } from '../models/Order.js';

export const getOrders = async (req, res, url) => {
  const date = url.searchParams.get("date");
  const filter = date ? { date } : {};
  const orders = await Order.find(filter);
  res.writeHead(200);
  res.end(JSON.stringify(orders));
};

export const createOrder = async (req, res, body) => {
  const newOrder = new Order(body);
  const savedOrder = await newOrder.save();
  res.writeHead(201);
  res.end(JSON.stringify(savedOrder));
};

export const updateOrder = async (req, res, pathname, body) => {
  const id = pathname.split("/")[2];
  const updated = await Order.findByIdAndUpdate(id, { status: body.status }, { new: true });
  res.writeHead(200);
  res.end(JSON.stringify(updated));
};